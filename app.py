from flask import Flask, render_template, url_for, redirect, request, flash, jsonify

# Import prediction module
import prediction
import requests
from geopy.distance import geodesic
import logging
import time
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

app = Flask(__name__)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# Add is_active_page function to templates
@app.context_processor
def utility_processor():
    def is_active_page(endpoint):
        return 'active' if request.endpoint == endpoint else ''
    return dict(is_active_page=is_active_page)


# Public routes - no login required
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/diet-suggestion')
def diet_suggestion():
    return render_template('diet-suggestion.html')

@app.route('/quick-relief')
def quick_relief():
    return render_template('quick_relief.html')

@app.route('/care-near-you')
def care_near_you():
    return render_template('care_near_you.html')


# Hospital finder functionality
def get_hospitals(lat, lon, radius=2000, max_results=100):
    try:
        lat = float(lat)
        lon = float(lon)
        if not (-90 <= lat <= 90) or not (-180 <= lon <= 180):
            raise ValueError("Invalid latitude or longitude values")
    except (TypeError, ValueError) as e:
        logger.error(f"Invalid coordinates: {e}")
        return []

    overpass_url = "http://overpass-api.de/api/interpreter"
    query = f"""
    [out:json];
    (
        node["amenity"="hospital"](around:{radius},{lat},{lon});
        node["amenity"="clinic"](around:{radius},{lat},{lon});
    );
    out;
    """
    
    try:
        logger.info(f"Sending Overpass API request for lat={lat}, lon={lon}, radius={radius}")
        response = requests.post(overpass_url, data={'data': query}, timeout=10)
        if response.status_code != 200:
            logger.error(f"Overpass API error: {response.status_code}")
            return []
        
        data = response.json()
        elements = data.get('elements', [])[:max_results]  # Limit results
        logger.info(f"Overpass API returned {len(elements)} hospitals/clinics")
    except requests.RequestException as e:
        logger.error(f"Overpass API request failed: {e}")
        return []

    hospitals = []
    session = requests.Session()
    retries = Retry(total=7, backoff_factor=2, status_forcelist=[502, 503, 504])
    session.mount('https://', HTTPAdapter(max_retries=retries))
    
    for element in elements:
        h_lat = element['lat']
        h_lon = element['lon']
        name = element['tags'].get('name', 'Unknown Hospital/Clinic')
        nominatim_url = f"https://nominatim.openstreetmap.org/reverse?lat={h_lat}&lon={h_lon}&format=json"
        
        try:
            headers = {'User-Agent': 'SympAI/1.0'}
            logger.info(f"Sending Nominatim request for lat={h_lat}, lon={h_lon}")
            nom_response = session.get(nominatim_url, headers=headers, timeout=20)
            address = nom_response.json().get('display_name', 'Address not found') if nom_response.status_code == 200 else f'Lat: {h_lat}, Lon: {h_lon}'
            logger.info(f"Nominatim returned address: {address}")
            time.sleep(1)  # Be nice to the Nominatim API
        except requests.RequestException as e:
            logger.error(f"Nominatim API request failed: {e}")
            address = f'Lat: {h_lat}, Lon: {h_lon}'
        
        distance = geodesic((lat, lon), (h_lat, h_lon)).km
        hospitals.append({
            'name': name,
            'address': address,
            'distance': distance,
            'lat': h_lat,
            'lon': h_lon
        })
    
    hospitals.sort(key=lambda x: x['distance'])
    logger.info(f"Returning {len(hospitals)} hospitals/clinics")
    return hospitals

@app.route('/get_hospitals', methods=['POST'])
def get_hospitals_route():
    try:
        data = request.json
        if not data or 'lat' not in data or 'lon' not in data:
            logger.error("Missing latitude or longitude in request")
            return jsonify({'error': 'Missing latitude or longitude'}), 400
        
        lat = data['lat']
        lon = data['lon']
        logger.info(f"Received request for hospitals at lat={lat}, lon={lon}")
        
        hospitals = get_hospitals(lat, lon)
        return jsonify(hospitals)
    except Exception as e:
        logger.error(f"Error processing request: {e}")
        return jsonify({'error': 'Failed to process request'}), 500

# Add prediction route
@app.route('/disease-prediction', methods=['GET', 'POST'])
def disease_prediction():
    symptom_choices = prediction.get_symptom_choices()
    if request.method == 'POST':
        patient_name = request.form['patient_name']
        symptoms = [request.form[f'symptom{i}'] for i in range(1, 6)]
        pred_summary, message, success = prediction.get_predictions(patient_name, symptoms)
        if success:
            return render_template('prediction.html', symptom_choices=symptom_choices, 
                                  diagnosis=pred_summary, tips=message, show_charts=True)
        return render_template('prediction.html', symptom_choices=symptom_choices, error=pred_summary)
    return render_template('prediction.html', symptom_choices=symptom_choices)



if __name__ == '__main__':
    app.run(debug=True, port=5001)
# Add these routes after your existing routes
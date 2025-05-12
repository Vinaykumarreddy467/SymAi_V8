# Disease Prediction System Using Symptoms Based on Machine Learning Algorithm

## Overview
The **Disease Prediction System** is a machine learning-based web application designed to predict diseases based on user-input symptoms. Developed as a final-year project by students at Sri Venkateswara College of Engineering & Technology, this system leverages advanced machine learning algorithms to provide accurate, accessible, and privacy-respecting diagnostic support, particularly for rural and underserved regions. The system achieves up to **98% accuracy** using the Random Forest algorithm and offers a user-friendly Flask-based GUI for seamless interaction.

## Features
- **High Accuracy**: Achieves 98% prediction accuracy using Random Forest, outperforming traditional systems (80–87%).
- **User-Friendly Interface**: Flask-based web GUI with dropdown menus for symptom selection, accessible to non-technical users.
- **Broad Disease Coverage**: Predicts 41 diseases based on 128 symptoms.
- **Real-Time Predictions**: Delivers instant results with confidence scores.
- **Offline Functionality**: Runs locally, ensuring data privacy and usability in areas with limited internet.
- **Scalable Design**: Modular architecture supports future enhancements like multilingual support and wearable integration.
- **Cost-Effective**: Built with open-source tools, requiring minimal hardware (4GB RAM, Intel i3 or higher).

## Installation

### Prerequisites
- **Hardware**:
  - Minimum: Intel Core i3, 4GB RAM, 40GB HDD/SSD
  - Recommended: Intel Core i5, 8GB RAM, 100GB SSD
- **Software**:
  - Operating System: Windows 7/8/10/11, Ubuntu 18.04+, or macOS 11+
  - Python 3.9 or higher
  - Web Browser: Google Chrome, Mozilla Firefox, or Microsoft Edge

### Python Dependencies
Install the required Python libraries using the following `requirements.txt`:

```
pandas==2.0.3
numpy==1.24.3
scikit-learn==1.2.2
flask==2.3.2
matplotlib==3.7.1
seaborn==0.12.2
scipy==1.10.1
```

Run the following command to install dependencies:

```bash
pip install -r requirements.txt
```

### Setup
1. Clone or download the project repository.
2. Ensure the dataset files (`Training_No_STDs.csv`, `disease_health_tips.csv`) are placed in the project directory.
3. Run the Flask application:
   ```bash
   python app.py
   ```
4. Open a web browser and navigate to `http://localhost:8080`.

## Usage
1. **Home Page**: Access the main interface with options for symptom checking, diet suggestions, care locator, and quick relief.
2. **Symptom Checker**:
   - Enter your name and select up to six symptoms from dropdown menus.
   - Submit to receive a predicted disease, confidence scores, and tailored health tips.
   - View bar and pie charts visualizing prediction distribution.
3. **Care Near You**: Input your location to find nearby hospitals or clinics.
4. **Diet Suggestion & Quick Relief**: Access curated health tips and remedies.

## Project Structure
- **app.py**: Main Flask application handling routes and hospital finder functionality.
- **prediction.py**: Contains machine learning models, prediction logic, and chart generation.
- **index.html**: Home page template with links to core features.
- **static/**: Stores CSS, JavaScript, images, and videos.
- **templates/**: HTML templates for rendering web pages.
- **Training_No_STDs.csv**: Dataset with 4921 records, 128 symptoms, and 41 diseases.
- **disease_health_tips.csv**: Health tips for predicted diseases.

## Machine Learning Models
The system uses three supervised learning models:
- **Decision Tree Classifier**: Splits data using Gini Index (max depth: 10).
- **Random Forest Classifier**: Ensemble of 100 decision trees, achieving 98% accuracy.
- **Naive Bayes Classifier**: Fast and effective for binary symptom data.

### Data Preprocessing
- **Missing Values**: Replaced with 0 (absence of symptom).
- **Symptom Severity Weighting**: Applied weights (1–7) based on clinical relevance.
- **Label Encoding**: Converted disease labels to numerical values.
- **Normalization**: Standardized features for better model convergence.

### Evaluation Metrics
- **Accuracy**: 98% (Random Forest)
- **Precision, Recall, F1-Score**: High scores across all models.
- **Confusion Matrix**: Visualized disease-wise performance.

## Screenshots

### Home Page
![Home Page](screenshots/home_page.png)
*Description*: The landing page with a video background and links to core features like Symptom Checker, Personalized Diet, Care Near You, and Quick Relief.

### Symptom Checker
![Symptom Checker](screenshots/symptom_checker.png)
*Description*: Users select symptoms from dropdowns and receive predictions with confidence scores and health tips.

### Personalized Diet Planner
![Personalized Diet](screenshots/personalized_diet.png)
*Description*: Displays tailored nutrition plans based on user needs.

### Care Near You
![Care Near You](screenshots/care_near_you.png)
*Description*: Locates nearby hospitals and clinics using user location.

### Quick Relief
![Quick Relief](screenshots/quick_relief.png)
*Description*: Provides guidance on over-the-counter remedies for common ailments.

## Future Scope
- **Expanded Disease Coverage**: Include rare and emerging diseases.
- **Multilingual Support**: Add regional languages like Hindi and Telugu.
- **Mobile App**: Develop a cross-platform app using Flutter or React Native.
- **Wearable Integration**: Use data from Fitbit, Apple Watch, etc., for enhanced predictions.
- **Doctor Recommendations**: Suggest nearby specialists based on predictions.
- **Explainable AI**: Integrate SHAP or LIME for transparent predictions.
- **Cloud Deployment**: Scale for larger user bases while maintaining privacy.

## Applications
- **Rural Healthcare**: Early diagnosis in areas with limited medical access.
- **Primary Care**: Assists GPs with triage and second opinions.
- **Emergency Care**: Rapid predictions for critical scenarios.
- **Public Health**: Monitors symptom patterns for outbreak detection.
- **Telemedicine**: Enhances remote consultations.
- **Personal Health**: Empowers users for self-monitoring and preventive care.

## Testing
- **Unit Testing**: Validated preprocessing, prediction, and GUI components (50+ test cases, 100% pass rate).
- **Integration Testing**: Ensured seamless data flow between Flask, models, and preprocessing.
- **System Testing**: Handled 10 concurrent users with 0.5s response time.
- **User Acceptance Testing**: Positive feedback from non-technical users, with minor GUI improvements implemented.

## Conclusion
The Disease Prediction System is a robust, accurate, and user-friendly tool that addresses healthcare accessibility challenges. With 98% accuracy, broad disease coverage, and a privacy-respecting design, it empowers users in rural and underserved areas to make informed health decisions. Future enhancements will further expand its impact, making it a valuable asset for global healthcare.

## References
- Grampurohit, S., et al. (2020). "Disease Prediction using Machine Learning Algorithms." IEEE INCET.
- Dahiwade, D., et al. (2019). "Designing Disease Prediction Model Using Machine Learning Approach." IEEE ICCMC.
- Kaggle "Disease Symptom Prediction" Dataset (2023).
- Scikit-learn, Flask, Pandas, NumPy, Matplotlib Documentation.

## Acknowledgments
- **Project Guide**: Mr. M. Navalan, Associate Professor, SVCET.
- **Team Members**: Berugu Mahaboob Basha, Budideti Sireesha, Madipatla Deepa, Manchuri Vaseem, Molakathala Vinay Kumar Reddy.
- **Kaggle Community**: For providing the dataset.
- **Open-Source Community**: For software and libraries used.# SymAi_V8

## Contributors
Thanks to these amazing people:
- [@mahaboob , @vinay_kumar_reddy ](https://github.com/mahaboob9143, https://github.com/Vinaykumarreddy467) – Code

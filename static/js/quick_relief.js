document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const conditionCardsContainer = document.getElementById('condition-cards');
    const dismissDisclaimerBtn = document.getElementById('dismiss-disclaimer');
    const disclaimerBanner = document.querySelector('.disclaimer-banner');

    // Dismiss disclaimer
    dismissDisclaimerBtn.addEventListener('click', function() {
        disclaimerBanner.style.display = 'none';
        localStorage.setItem('disclaimerDismissed', 'true');
    });

    // Check localStorage for dismissed state
    if (localStorage.getItem('disclaimerDismissed') === 'true') {
        disclaimerBanner.style.display = 'none';
    }

    // Sample data (you can expand this)
    const conditions = [
        {
            name: 'Common Cold',
            symptoms: 'Runny nose, sneezing, congestion, sore throat, cough',
            medications: [
                { name: 'Acetaminophen (Tylenol)', type: 'otc', description: 'Reduces fever and relieves pain' },
                { name: 'Pseudoephedrine (Sudafed)', type: 'otc', description: 'Relieves nasal congestion' },
                { name: 'Dextromethorphan (Robitussin DM)', type: 'otc', description: 'Suppresses cough' }
            ],
            selfCare: [
                'Rest and stay hydrated',
                'Use a humidifier or hot shower',
                'Gargle with salt water',
                'Use saline nasal spray'
            ],
            warning: 'See a doctor if symptoms last more than 10 days or are severe.'
        }
        // Add more conditions as needed
        ,
        {
            name: 'Seasonal Allergies',
            symptoms: 'Sneezing, itchy/watery eyes, runny nose, congestion',
            medications: [
                { name: 'Cetirizine (Zyrtec)', type: 'otc', description: 'Antihistamine that relieves allergy symptoms' },
                { name: 'Loratadine (Claritin)', type: 'otc', description: 'Non-drowsy antihistamine' },
                { name: 'Fluticasone (Flonase)', type: 'otc', description: 'Nasal spray that reduces inflammation' }
            ],
            selfCare: [
                'Stay indoors when pollen counts are high',
                'Use air purifiers with HEPA filters',
                'Shower and change clothes after being outdoors',
                'Keep windows closed during high pollen seasons'
            ],
            warning: 'You experience wheezing, shortness of breath, or symptoms that significantly interfere with daily activities despite treatment.'
        },
        {
            name: 'Headache',
            symptoms: 'Pain or pressure in head, sensitivity to light or sound',
            medications: [
                { name: 'Ibuprofen (Advil, Motrin)', type: 'otc', description: 'Reduces inflammation and pain' },
                { name: 'Acetaminophen (Tylenol)', type: 'otc', description: 'Relieves pain' },
                { name: 'Aspirin', type: 'otc', description: 'Reduces pain and inflammation' }
            ],
            selfCare: [
                'Rest in a quiet, dark room',
                'Apply a cold or warm compress to your head',
                'Practice relaxation techniques',
                'Stay hydrated and maintain regular meals'
            ],
            warning: 'Headache is sudden and severe, accompanied by fever, stiff neck, confusion, seizures, double vision, weakness, numbness, or difficulty speaking.'
        },
        {
            name: 'Indigestion',
            symptoms: 'Discomfort in upper abdomen, bloating, nausea, heartburn',
            medications: [
                { name: 'Antacids (Tums, Rolaids)', type: 'otc', description: 'Neutralizes stomach acid' },
                { name: 'Famotidine (Pepcid)', type: 'otc', description: 'Reduces production of stomach acid' },
                { name: 'Omeprazole (Prilosec)', type: 'otc', description: 'Proton pump inhibitor that decreases acid production' }
            ],
            selfCare: [
                'Eat smaller, more frequent meals',
                'Avoid trigger foods (spicy, fatty, acidic)',
                'Don\'t lie down right after eating',
                'Maintain a healthy weight'
            ],
            warning: 'Symptoms persist for more than two weeks, you have difficulty swallowing, vomiting blood, or have black/tarry stools.'
        },
        {
            name: 'Muscle Strain',
            symptoms: 'Pain, swelling, limited movement, muscle spasms',
            medications: [
                { name: 'Ibuprofen (Advil, Motrin)', type: 'otc', description: 'Reduces inflammation and pain' },
                { name: 'Naproxen (Aleve)', type: 'otc', description: 'Reduces inflammation and pain' },
                { name: 'Acetaminophen (Tylenol)', type: 'otc', description: 'Relieves pain' }
            ],
            selfCare: [
                'Rest the injured area',
                'Apply ice for 20 minutes several times a day',
                'Compress with an elastic bandage',
                'Elevate the injured area above heart level if possible'
            ],
            warning: 'You hear or feel a pop at the time of injury, can\'t move the affected joint, or have severe pain, swelling, or discoloration.'
        },
        {
            name: 'Insomnia',
            symptoms: 'Difficulty falling asleep, staying asleep, or waking too early',
            medications: [
                { name: 'Melatonin', type: 'natural', description: 'Helps regulate sleep-wake cycle' },
                { name: 'Diphenhydramine (Benadryl)', type: 'otc', description: 'Antihistamine with sedative effects' },
                { name: 'Doxylamine (Unisom)', type: 'otc', description: 'Sleep aid that induces drowsiness' }
            ],
            selfCare: [
                'Maintain a regular sleep schedule',
                'Create a relaxing bedtime routine',
                'Limit screen time before bed',
                'Keep your bedroom cool, dark, and quiet'
            ],
            warning: 'Insomnia persists for more than a month, interferes significantly with daily activities, or is accompanied by breathing difficulties during sleep.'
        },
        {
            name: 'Minor Burns',
            symptoms: 'Redness, pain, swelling, blisters',
            medications: [
                { name: 'Aloe Vera Gel', type: 'natural', description: 'Soothes and moisturizes burned skin' },
                { name: 'Ibuprofen (Advil, Motrin)', type: 'otc', description: 'Reduces inflammation and pain' },
                { name: 'Bacitracin Ointment', type: 'otc', description: 'Prevents infection in minor burns' }
            ],
            selfCare: [
                'Cool the burn with cool (not cold) running water for 10-15 minutes',
                'Don\'t break blisters',
                'Apply moisturizer or aloe vera gel',
                'Cover with a sterile, non-stick bandage'
            ],
            warning: 'The burn is larger than 3 inches, involves the face, hands, feet, genitals, or major joints, or appears deep (affects all layers of skin).'
        },
        {
            name: 'Diarrhea',
            symptoms: 'Loose, watery stools, abdominal cramps, urgency',
            medications: [
                { name: 'Loperamide (Imodium)', type: 'otc', description: 'Slows intestinal movement' },
                { name: 'Bismuth Subsalicylate (Pepto-Bismol)', type: 'otc', description: 'Reduces inflammation and diarrhea' },
                { name: 'Probiotics', type: 'natural', description: 'Restores healthy gut bacteria' }
            ],
            selfCare: [
                'Stay hydrated with water, clear broths, and electrolyte solutions',
                'Eat bland, easy-to-digest foods (BRAT diet: bananas, rice, applesauce, toast)',
                'Avoid dairy, fatty, spicy, or high-fiber foods',
                'Avoid caffeine and alcohol'
            ],
            warning: 'Diarrhea lasts more than 2 days, you have severe pain, a fever above 102°F (39°C), or signs of dehydration (excessive thirst, dry mouth, little/no urination, severe weakness).'
        },{
            name: 'Fever',
            symptoms: 'Elevated body temperature, chills, sweating, headache, muscle aches',
            medications: [
                { name: 'Acetaminophen (Tylenol)', type: 'otc', description: 'Reduces fever' },
                { name: 'Ibuprofen (Advil, Motrin)', type: 'otc', description: 'Reduces fever and inflammation' },
                { name: 'Aspirin (adults only)', type: 'otc', description: 'Reduces fever and pain' }
            ],
            selfCare: [
                'Rest and stay hydrated',
                'Dress in lightweight clothing',
                'Use a light blanket if you have chills',
                'Take a lukewarm bath or apply cool compresses'
            ],
            warning: 'Fever is above 103°F (39.4°C), lasts more than three days, or is accompanied by severe headache, stiff neck, confusion, or difficulty breathing.'
        },
        {
            name: 'Minor Cuts and Scrapes',
            symptoms: 'Broken skin, minor bleeding, pain, redness',
            medications: [
                { name: 'Hydrogen Peroxide', type: 'otc', description: 'Cleans wounds and prevents infection' },
                { name: 'Bacitracin or Neosporin', type: 'otc', description: 'Antibiotic ointment that prevents infection' },
                { name: 'Acetaminophen (Tylenol)', type: 'otc', description: 'Relieves pain' }
            ],
            selfCare: [
                'Clean the wound with mild soap and water',
                'Apply gentle pressure with a clean cloth to stop bleeding',
                'Apply antibiotic ointment',
                'Cover with a sterile bandage, changing daily'
            ],
            warning: 'The wound is deep, has jagged edges, or you can\'t close it easily; bleeding doesn\'t stop after 10 minutes of pressure; or signs of infection develop (increasing pain, redness, warmth, swelling, or discharge).'
        },
        {
            name: 'Constipation',
            symptoms: 'Infrequent bowel movements, difficulty passing stool, hard or dry stool',
            medications: [
                { name: 'Docusate (Colace)', type: 'otc', description: 'Stool softener' },
                { name: 'Psyllium (Metamucil)', type: 'otc', description: 'Fiber supplement that adds bulk to stool' },
                { name: 'Polyethylene glycol (MiraLAX)', type: 'otc', description: 'Osmotic laxative that draws water into the colon' }
            ],
            selfCare: [
                'Increase fiber intake (fruits, vegetables, whole grains)',
                'Drink plenty of water (8-10 glasses daily)',
                'Exercise regularly',
                'Establish a regular bathroom routine'
            ],
            warning: 'Constipation lasts more than two weeks, is accompanied by severe abdominal pain, blood in stool, unexplained weight loss, or alternates with diarrhea.'
        },
        {
            name: 'Sunburn',
            symptoms: 'Red, painful skin that feels hot to touch, swelling, blisters',
            medications: [
                { name: 'Aloe Vera Gel', type: 'natural', description: 'Soothes and moisturizes sunburned skin' },
                { name: 'Ibuprofen (Advil, Motrin)', type: 'otc', description: 'Reduces inflammation and pain' },
                { name: 'Hydrocortisone Cream', type: 'otc', description: 'Reduces inflammation and itching' }
            ],
            selfCare: [
                'Take cool baths or showers',
                'Apply moisturizer with aloe vera',
                'Drink extra water to prevent dehydration',
                'Wear loose, soft clothing over sunburned areas'
            ],
            warning: 'Sunburn covers a large portion of your body, is accompanied by fever, extreme pain, headache, confusion, nausea, or chills, or blisters become infected.'
        },{
            name: 'Acid Reflux',
            symptoms: 'Burning sensation in chest (heartburn), regurgitation of food or sour liquid, difficulty swallowing',
            medications: [
                { name: 'Omeprazole (Prilosec)', type: 'otc', description: 'Proton pump inhibitor that reduces stomach acid production' },
                { name: 'Calcium Carbonate (Tums)', type: 'otc', description: 'Antacid that neutralizes stomach acid' },
                { name: 'Famotidine (Pepcid)', type: 'otc', description: 'H2 blocker that reduces acid production' }
            ],
            selfCare: [
                'Maintain a healthy weight',
                'Avoid lying down for 3 hours after meals',
                'Elevate the head of your bed 6-8 inches',
                'Avoid trigger foods (spicy, fatty, citrus, chocolate, mint)'
            ],
            warning: 'You have chest pain or pressure, especially with shortness of breath, jaw or arm pain; you have difficulty swallowing; or you have persistent vomiting.'
        },
        {
            name: 'Athlete\'s Foot',
            symptoms: 'Itchy, scaly rash between toes, dry flaky skin on soles, blisters, cracking',
            medications: [
                { name: 'Clotrimazole (Lotrimin)', type: 'otc', description: 'Antifungal cream that treats fungal infections' },
                { name: 'Terbinafine (Lamisil AT)', type: 'otc', description: 'Antifungal that kills fungi' },
                { name: 'Tolnaftate (Tinactin)', type: 'otc', description: 'Antifungal that prevents fungal growth' }
            ],
            selfCare: [
                'Keep feet clean and dry, especially between toes',
                'Change socks daily and wear breathable footwear',
                'Use antifungal powder in shoes',
                'Don\'t walk barefoot in public showers or pool areas'
            ],
            warning: 'The infection spreads to your nails or other parts of your body, causes severe cracking or bleeding, or doesn\'t improve after 2 weeks of treatment.'
        },
        {
            name: 'Canker Sores',
            symptoms: 'Small, painful ulcers inside mouth, white or gray with red border',
            medications: [
                { name: 'Benzocaine (Orajel)', type: 'otc', description: 'Numbing agent that provides temporary pain relief' },
                { name: 'Hydrogen Peroxide Rinse', type: 'otc', description: 'Antiseptic that helps clean the sore' },
                { name: 'Milk of Magnesia', type: 'otc', description: 'Applied to sores to neutralize acid and form protective coating' }
            ],
            selfCare: [
                'Rinse with salt water or baking soda solution',
                'Avoid spicy, acidic, or abrasive foods',
                'Use a soft-bristled toothbrush',
                'Apply ice to the sore to reduce pain'
            ],
            warning: 'Sores are unusually large (larger than 1 cm), last longer than 3 weeks, extend to the lips, or are accompanied by fever, severe pain, or difficulty eating or drinking.'
        },
        {
            name: 'Eye Strain',
            symptoms: 'Sore, tired, burning or itchy eyes, blurred vision, headache, difficulty focusing',
            medications: [
                { name: 'Artificial Tears', type: 'otc', description: 'Lubricates eyes and relieves dryness' },
                { name: 'Antihistamine Eye Drops', type: 'otc', description: 'Reduces allergic eye irritation' },
                { name: 'Acetaminophen (Tylenol)', type: 'otc', description: 'Relieves associated headaches' }
            ],
            selfCare: [
                'Follow the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds',
                'Adjust screen brightness and position',
                'Use proper lighting for reading',
                'Take regular breaks from screens and close-up work'
            ],
            warning: 'You experience sudden vision changes, severe eye pain, double vision, or eye strain symptoms persist despite self-care measures.'
        },
        {
            name: 'Dry Skin',
            symptoms: 'Rough, flaky, or scaly patches, itching, tightness, cracks in skin',
            medications: [
                { name: 'Petrolatum (Vaseline)', type: 'otc', description: 'Locks in moisture and protects skin' },
                { name: 'Ceramide Creams (CeraVe)', type: 'otc', description: 'Restores skin barrier and retains moisture' },
                { name: 'Hydrocortisone Cream', type: 'otc', description: 'Reduces itching and inflammation' }
            ],
            selfCare: [
                'Use warm (not hot) water for bathing',
                'Apply moisturizer immediately after bathing',
                'Use a humidifier in dry environments',
                'Choose fragrance-free soaps and detergents'
            ],
            warning: 'Skin becomes severely cracked or bleeds, shows signs of infection (redness, swelling, warmth), or dry patches spread rapidly or don\'t improve with self-care.'
        },
        {
            name: 'Motion Sickness',
            symptoms: 'Nausea, vomiting, dizziness, cold sweats, increased salivation',
            medications: [
                { name: 'Dimenhydrinate (Dramamine)', type: 'otc', description: 'Prevents and treats motion sickness' },
                { name: 'Meclizine (Bonine)', type: 'otc', description: 'Prevents motion sickness with less drowsiness' },
                { name: 'Ginger Supplements', type: 'natural', description: 'Natural remedy that may reduce nausea' }
            ],
            selfCare: [
                'Choose a seat where motion is felt least (front seat of car, over wing in airplane)',
                'Focus on the horizon or a fixed point',
                'Ensure good ventilation',
                'Avoid reading or using screens during travel'
            ],
            warning: 'Symptoms are severe and persistent despite medication, or you experience unusual or severe headache, difficulty breathing, chest pain, or irregular heartbeat.'
        },
        {
            name: 'Poison Ivy/Oak/Sumac',
            symptoms: 'Itchy red rash, bumps or blisters, swelling',
            medications: [
                { name: 'Calamine Lotion', type: 'otc', description: 'Soothes itching and dries oozing blisters' },
                { name: 'Hydrocortisone Cream', type: 'otc', description: 'Reduces inflammation and itching' },
                { name: 'Diphenhydramine (Benadryl)', type: 'otc', description: 'Oral antihistamine that reduces itching' }
            ],
            selfCare: [
                'Wash skin with soap and water immediately after exposure',
                'Apply cool compresses to the rash',
                'Take cool baths with colloidal oatmeal',
                'Avoid scratching to prevent infection'
            ],
            warning: 'The rash covers a large portion of your body, affects your face or genitals, causes severe swelling, or shows signs of infection (increased pain, pus, warmth).'
        },
        {
            name: 'Urinary Tract Infection (UTI)',
            symptoms: 'Burning sensation when urinating, frequent urination, cloudy or strong-smelling urine',
            medications: [
                { name: 'Phenazopyridine (AZO)', type: 'otc', description: 'Relieves urinary pain and burning (note: only treats symptoms, not the infection)' },
                { name: 'Cranberry Supplements', type: 'natural', description: 'May help prevent UTIs but doesn\'t treat active infections' },
                { name: 'Acetaminophen (Tylenol)', type: 'otc', description: 'Relieves pain and discomfort' }
            ],
            selfCare: [
                'Drink plenty of water to flush bacteria',
                'Urinate frequently and completely',
                'Avoid irritating substances (caffeine, alcohol, spicy foods)',
                'Apply a heating pad to your abdomen to reduce discomfort'
            ],
            warning: 'You have fever, chills, back pain, nausea, or vomiting; blood in urine; or symptoms don\'t improve within 2 days. UTIs typically require antibiotics prescribed by a healthcare provider.'
        }
    ];

    // Helper: get readable label from medication type
    function getMedicineTypeLabel(type) {
        switch (type) {
            case 'otc': return 'OTC';
            case 'prescription': return 'Rx';
            case 'natural': return 'Natural';
            default: return type;
        }
    }

    // Helper: generate a card element from condition object
    function createConditionCard(condition) {
        const card = document.createElement('div');
        card.className = 'condition-card';

        card.innerHTML = `
            <div class="condition-header">
                <h2>${condition.name}</h2>
                <p class="condition-symptoms">${condition.symptoms}</p>
            </div>
            <div class="condition-body">
                <div class="medication-section">
                    <h3><i class="fas fa-pills"></i> Medications</h3>
                    <div class="medication-list">
                        ${condition.medications.map(med => `
                            <div class="medication-item">
                                <span class="medication-type ${med.type}">${getMedicineTypeLabel(med.type)}</span>
                                <div class="medication-info">
                                    <div class="medication-name">${med.name}</div>
                                    <div class="medication-description">${med.description}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="self-care-section">
                    <h3><i class="fas fa-home"></i> Self-Care Tips</h3>
                    <div class="self-care-list">
                        ${condition.selfCare.map(tip => `
                            <div class="self-care-item">
                                <i class="fas fa-check-circle"></i>
                                <span class="self-care-text">${tip}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="warning-section">
                    <h3><i class="fas fa-exclamation-triangle"></i> See a doctor if...</h3>
                    <p>${condition.warning}</p>
                </div>
            </div>
        `;

        return card;
    }

    // Render all cards to the container
    function renderConditionCards() {
        conditionCardsContainer.innerHTML = '';
        conditions.forEach(condition => {
            const card = createConditionCard(condition);
            conditionCardsContainer.appendChild(card);
        });
    }

    // Initial render
    renderConditionCards();
});
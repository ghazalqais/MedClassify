# MedClassify - Arabic Medical AI Assistant

**[Try Live Demo](https://medical-specialty-classifier-214885169773.us-central1.run.app/)**

An intelligent Arabic medical AI web application that analyzes patient symptoms and recommends the appropriate medical specialty with 90%+ accuracy. Built with fine-tuned MARBERT and trained on 90K+ annotated medical consultations.

## Key Results

- **90%+ accuracy** with fine-tuned MARBERT model
- **90K+ medical consultations** used for training
- **5 medical specialties** supported with bilingual interface
- **Real-time classification** with native Arabic RTL support
- **Production deployment** on Google Cloud Run

## Supported Medical Specialties

1. **طب الأسنان (Dentistry)** - Dental and oral health issues
2. **طب العيون (Ophthalmology)** - Eye and vision problems
3. **جراحة العظام والمفاصل (Orthopedics)** - Bone, joint, and muscle issues
4. **الطب النفسي (Psychiatry)** - Mental health concerns
5. **التغذية (Nutrition)** - Diet and nutritional guidance

## Tech Stack

- **Model**: MARBERT (Arabic BERT) fine-tuned for medical classification
- **Backend**: Flask, PyTorch, Transformers
- **Frontend**: HTML5, CSS3, JavaScript with RTL Arabic support
- **Deployment**: Docker, Google Cloud Run
- **Languages**: Python, Arabic NLP

## Quick Start

### Prerequisites

- Python 3.8+
- pip

### Installation

```bash
git clone https://github.com/ghazalqais/medical-specialty-classifier.git
cd medical-specialty-classifier
pip install -r requirements.txt
python app.py
```

_Note: Model files are not included in this repository due to size constraints. Contact me for access to the trained model weights._

## Methodology

- **Data**: 90K+ annotated Arabic medical consultations
- **Preprocessing**: Custom Arabic text processing pipeline with tashkeel removal and normalization
- **Training**: MARBERT fine-tuning with 4 epochs, learning rate 2e-5, batch size 16
- **Evaluation**: Stratified 70/15/15 train/validation/test split maintaining class balance
- **Enhanced preprocessing** with ISRI stemming and stop word removal

## Features

- **Real-time Arabic text classification** with instant results
- **Bilingual interface** (Arabic/English) with native RTL support
- **Smart example inputs** for quick testing across all specialties
- **Mobile-responsive design** with touch-optimized interface
- **Privacy-focused** (no data storage or personal information retention)

## User Interface

- **Modern Arabic design** with Cairo font and Material Icons
- **Animated AI brain visualization** showing neural network processing
- **Interactive example gallery** for quick symptom testing
- **Comprehensive results page** with confidence metrics and next steps

## Docker Deployment

```bash
# Build image
docker build -t medclassify .

# Run container
docker run -p 8080:8080 medclassify
```

## Model Information

The fine-tuned MARBERT model files are not included in this repository due to GitHub size limitations.

**To obtain the model files:**

- Email: qaisghazal45@gmail.com
- LinkedIn: [Qais Ghazal](https://www.linkedin.com/in/qais-ghazal-b80b43230/)

**Model files include:**

- `model.safetensors` - Fine-tuned MARBERT weights
- `label_encoder.pkl` - Medical specialty label encoder
- `tokenizer files` - Arabic tokenizer configuration

## Project Structure

```
medical-specialty-classifier/
├── app.py              # Flask web application
├── requirements.txt    # Python dependencies
├── Dockerfile         # Container configuration
├── static/            # CSS and JavaScript files
├── templates/         # HTML templates
└── README.md         # Project documentation
```

## Use Cases

- **Patients**: Get initial guidance on which medical specialist to consult
- **Healthcare**: Triage and routing system for medical consultations
- **Research**: Arabic medical NLP and classification studies

## License

MIT License

## Author

**Qais Ghazal** - AI & Machine Learning Engineer  
Data Science & AI Student at Al Hussein Technical University

- LinkedIn: [Qais Ghazal](https://www.linkedin.com/in/qais-ghazal-b80b43230/)
- Email: qaisghazal45@gmail.com
- GitHub: [@ghazalqais](https://github.com/ghazalqais)
- Kaggle: [@qghazal](https://www.kaggle.com/qghazal)

---

Star this repository if you found it helpful!

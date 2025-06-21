# app.py - Flask Application for Medical Specialty Classification
from flask import Flask, render_template, request, jsonify
import os
import sys
import json

# Add debug prints at startup
print("🚀 STARTING MEDICAL SPECIALTY CLASSIFIER", flush=True)
print(f"Python version: {sys.version}", flush=True)
print(f"Current working directory: {os.getcwd()}", flush=True)

app = Flask(__name__)

# Add model directory to path and properly import functions
model_dir = os.path.join(os.path.dirname(__file__), 'model')
sys.path.append(model_dir)

# Global variables
model = None
tokenizer = None
label_encoder = None
device = None

def load_model():
    """Load the medical specialty classification model with extensive debugging"""
    global model, tokenizer, label_encoder, device
    
    print("🔄 LOAD_MODEL FUNCTION CALLED", flush=True)
    print(f"Current directory: {os.getcwd()}", flush=True)
    
    try:
        print(f"Files in current directory: {os.listdir('.')}", flush=True)
    except Exception as e:
        print(f"Error listing current directory: {e}", flush=True)
    
    # Set model path and check if it exists
    model_path = os.path.join(os.path.dirname(__file__), 'fine_tuned_marbert_medical_specialty')
    full_path = os.path.abspath(model_path)
    print(f"Full model path: {full_path}", flush=True)
    print(f"Directory exists: {os.path.exists(full_path)}", flush=True)

    if os.path.exists(full_path):
        try:
            contents = os.listdir(full_path)
            print(f"Contents: {contents}", flush=True)
        except Exception as e:
            print(f"Error listing model directory: {e}", flush=True)
            return False
    else:
        print(f"❌ MODEL DIRECTORY NOT FOUND: {full_path}", flush=True)
        return False
    
    # Check if model directory exists
    model_dir_path = os.path.join(os.path.dirname(__file__), 'model')
    model_dir_exists = os.path.exists(model_dir_path)
    print(f"Model code directory exists: {model_dir_exists}", flush=True)
    
    if model_dir_exists:
        try:
            model_files = os.listdir(model_dir_path)
            print(f"Files in model directory: {model_files}", flush=True)
        except Exception as e:
            print(f"Error reading model directory: {e}", flush=True)
    
    try:
        # Import predict functions
        print("📥 Importing predict functions...", flush=True)
        from predict import load_model as load_model_func, predict_medical_specialty
        print("✅ Predict functions imported successfully", flush=True)
        
        # Load the model
        print(f"🤖 Loading model from: {model_path}", flush=True)
        model, tokenizer, label_encoder, device = load_model_func(model_path)
        print("✅ Model loaded successfully!", flush=True)
        print(f"🔧 Using device: {device}", flush=True)
        
        return True
        
    except Exception as e:
        print(f"❌ Error loading model: {e}", flush=True)
        import traceback
        traceback.print_exc()
        return False

def predict_specialty(text):
    """Make prediction on text using the medical specialty model"""
    print(f"🔍 predict_specialty called with text length: {len(text) if text else 0}", flush=True)
    
    if model is None or tokenizer is None or label_encoder is None:
        print("❌ Model not loaded", flush=True)
        return None
    
    try:
        print("🤖 Making prediction...", flush=True)
        
        # Import predict function
        from predict import predict_medical_specialty
        
        # Make prediction
        result = predict_medical_specialty(text, model, tokenizer, label_encoder, device)
        
        print(f"✅ Prediction: {result['specialty']}, Confidence: {result['confidence']:.2f}%", flush=True)
        
        return result
    
    except Exception as e:
        print(f"❌ Error in predict_specialty: {e}", flush=True)
        import traceback
        traceback.print_exc()
        return None

# Routes
@app.route('/')
def home():
    print("📄 Home route accessed", flush=True)
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    print("🔮 Predict endpoint called", flush=True)
    try:
        # Get input text from form
        text = request.form.get('text', '').strip()
        
        print(f"Text received: {text[:100]}..." if len(text) > 100 else f"Text received: {text}", flush=True)
        
        if not text:
            print("❌ No text provided", flush=True)
            return render_template('result.html', 
                                 error="Please provide some text to analyze")
        
        # Make prediction
        result = predict_specialty(text)
        
        if result is None:
            print("❌ Prediction failed - model not available", flush=True)
            return render_template('result.html', 
                                 error="Model not available or prediction failed")
        
        # Sort probabilities for display
        sorted_probs = sorted(result['probabilities'].items(), key=lambda x: x[1], reverse=True)
        
        print(f"✅ Returning result to template", flush=True)
        return render_template('result.html', 
                              text=text,
                              specialty=result['specialty'],
                              confidence=result['confidence'],
                              probabilities=sorted_probs)
        
    except Exception as e:
        print(f"❌ Error in predict endpoint: {e}", flush=True)
        import traceback
        traceback.print_exc()
        return render_template('result.html', 
                             error=f"An error occurred: {str(e)}")

@app.route('/api/predict', methods=['POST'])
def api_predict():
    print("🔮 API Predict endpoint called", flush=True)
    try:
        # Get JSON data
        data = request.get_json()
        text = data.get('text', '').strip() if data else ''
        
        print(f"API Text received: {text[:100]}..." if len(text) > 100 else f"API Text received: {text}", flush=True)
        
        if not text:
            print("❌ No text provided in API call", flush=True)
            return jsonify({'error': 'No text provided'}), 400
        
        # Make prediction
        result = predict_specialty(text)
        
        if result is None:
            print("❌ API Prediction failed - model not available", flush=True)
            return jsonify({'error': 'Model not available or prediction failed'}), 500
        
        print(f"✅ API Returning result: {result['specialty']}", flush=True)
        return jsonify(result)
        
    except Exception as e:
        print(f"❌ Error in API predict endpoint: {e}", flush=True)
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/health')
def health():
    """Health check endpoint for Cloud Run"""
    print("🏥 Health check endpoint called", flush=True)
    model_loaded = model is not None and tokenizer is not None and label_encoder is not None
    return jsonify({
        "status": "healthy" if model_loaded else "unhealthy",
        "model_loaded": model_loaded
    }), 200 if model_loaded else 503

@app.route('/debug-info')
def debug_info():
    """Debug endpoint to check system status"""
    print("🔧 Debug info endpoint called", flush=True)
    
    model_path = os.path.join(os.path.dirname(__file__), 'fine_tuned_marbert_medical_specialty')
    model_dir_path = os.path.join(os.path.dirname(__file__), 'model')
    
    debug_data = {
        'model_loaded': model is not None,
        'tokenizer_loaded': tokenizer is not None,
        'label_encoder_loaded': label_encoder is not None,
        'device': str(device) if device else None,
        'current_dir': os.getcwd(),
        'model_path_exists': os.path.exists(model_path),
        'model_code_dir_exists': os.path.exists(model_dir_path),
        'templates_exists': os.path.exists('templates'),
        'python_version': sys.version,
        'model_files': os.listdir(model_path) if os.path.exists(model_path) else [],
        'model_code_files': os.listdir(model_dir_path) if os.path.exists(model_dir_path) else [],
        'all_files': os.listdir('.') if os.path.exists('.') else []
    }
    
    print(f"Debug data: {debug_data}", flush=True)
    return jsonify(debug_data)

if __name__ == '__main__':
    print("🎯 MAIN FUNCTION STARTING", flush=True)
    
    try:
        print("🤖 Loading model...", flush=True)
        model_loaded = load_model()
        
        if model_loaded:
            print("✅ Model loading complete", flush=True)
        else:
            print("❌ Model loading failed", flush=True)
        
        print("🌐 Starting Flask app...", flush=True)
        app.run(debug=True, host='0.0.0.0', port=5001)
        
    except Exception as e:
        print(f"❌ CRITICAL STARTUP ERROR: {e}", flush=True)
        import traceback
        traceback.print_exc()
else:
    # This runs when deployed (not in debug mode)
    print("🚀 App imported for deployment", flush=True)
    
    print("🤖 Loading model for deployment...", flush=True)
    model_loaded = load_model()
    
    if model_loaded:
        print("✅ Model loading complete for deployment", flush=True)
    else:
        print("❌ Model loading failed for deployment", flush=True)
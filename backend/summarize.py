import PyPDF2

def summarize_pdf(file):
    reader = PyPDF2.PdfReader(file)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    
    # Simple summarization: Just return the first 500 characters
    return text[:5000] + "..." if len(text) > 5000 else text

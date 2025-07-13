import os
import re
from typing import Dict, Any
import torch
from PIL import Image
import fitz 
import spacy
from transformers import AutoProcessor, AutoModelForVision2Seq

nlp = spacy.load("en_core_web_sm")

processor = AutoProcessor.from_pretrained(
    "allenai/olmOCR-7B-0225-preview",
    use_fast=True
)

processor.save_pretrained("./olmocr-processor-fixed")
processor = AutoProcessor.from_pretrained(
    "./olmocr-processor-fixed",
    use_fast=True
)


model = AutoModelForVision2Seq.from_pretrained(
    "allenai/olmOCR-7B-0225-preview"
).to("cuda" if torch.cuda.is_available() else "cpu")

def ocr_extract_text(image: Image.Image) -> str:
    image = image.convert("RGB")
    inputs = processor(images=image, return_tensors="pt").to(model.device)
    generated_ids = model.generate(**inputs, max_new_tokens=512)
    text = processor.batch_decode(generated_ids, skip_special_tokens=True)[0]
    return text.strip()

def data_extraction(file_path: str) -> Dict[str, Any]:
    if os.path.getsize(file_path) > 10 * 1024 * 1024:
        raise ValueError("File size exceeds 10MB")
    tables = []
    text = ""
    if file_path.lower().endswith(".pdf"):
        doc = fitz.open(file_path)
        if doc.page_count > 1:
            raise ValueError("Only single-page PDFs are supported")
        page = doc.load_page(0)
        pix = page.get_pixmap(dpi=300)
        image = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        text = ocr_extract_text(image)
    else:
        image = Image.open(file_path)
        text = ocr_extract_text(image)
    lines = text.split("\n")
    table_lines = [line for line in lines if re.search(r"\S+\s{2,}\S+", line)]
    if len(table_lines) >= 2:
        headers = re.split(r"\s{2,}", table_lines[0].strip())
        rows = [re.split(r"\s{2,}", l.strip()) for l in table_lines[1:]]
        tables.append({"headers": headers, "rows": rows})
    doc_nlp = nlp(text)
    names = [ent.text for ent in doc_nlp.ents if ent.label_ == "PERSON"]
    dates = re.findall(r"^[\p{L}\p{N}\p{M}\p{P}\p{S}\p{Z}\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\uAC00-\uD7AF\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\u0590-\u05FF\u0370-\u03FF\u0400-\u04FF]{5,500}$",text)
    addresses = [ent.text for ent in doc_nlp.ents if ent.label_ in ["GPE", "LOC", "FACILITY"]]
    structure = [line.strip() for line in lines if line.strip()]
    return {
        "entities": {"names": names,"dates": dates,"addresses": addresses},"structure": structure,"tables": tables
        }
if __name__ == "__main__":
    result = data_extraction(r"S:\in1\data-extraction-tool\p.pdf")  # ✅ Use a valid PDF or image file here
    from pprint import pprint
    pprint(result)    
import os
import torch

from PIL import Image
from lavis.models import load_model_and_preprocess
from googletrans import Translator

# 引数による画像ファイル取得
class NameGenerator:
    
    # 画像からキャプションの自動生成
    def generate(filepath):
        # setup device to use
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        # load sample image
        raw_image = Image.open(filepath).convert("RGB")
    
        device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        # loads BLIP caption base model, with finetuned checkpoints on MSCOCO captioning dataset.
        # this also loads the associated image processors
        model, vis_processors, _ = load_model_and_preprocess(name="blip_caption", model_type="base_coco", is_eval=True, device=device)
        # preprocess the image
        # vis_processors stores image transforms for "train" and "eval" (validation / testing / inference)
        image = vis_processors["eval"](raw_image).unsqueeze(0).to(device)
        # generate caption
        caption_data = model.generate({"image": image})
        caption = caption_data[0]
        return caption
        
    # キャプションの日本語化
    def translate(text_en):
        translator = Translator()
        text_ja = translator.translate(text_en, src='en', dest='ja').text
        return text_ja

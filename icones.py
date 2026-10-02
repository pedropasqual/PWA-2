# criar_icones.py - Execute para gerar ícones
from PIL import Image, ImageDraw, ImageFont
import os

# Cria pasta icons se não existir
if not os.path.exists('icons'):
    os.makedirs('icons')

tamanhos = [72, 96, 128, 144, 152, 192, 384, 512]
cor_fundo = (76, 175, 80)  # Verde #4CAF50
cor_texto = (255, 255, 255)

for tamanho in tamanhos:
    img = Image.new('RGB', (tamanho, tamanho), color=cor_fundo)
    draw = ImageDraw.Draw(img)
    
    # Desenha um círculo central
    margin = tamanho // 8
    draw.ellipse([margin, margin, tamanho-margin, tamanho-margin], 
                 outline=cor_texto, width=tamanho//20)
    
    # Desenha um "S" no centro
    try:
        font = ImageFont.truetype("arial.ttf", tamanho//2)
    except:
        font = ImageFont.load_default()
    
    # Calcula posição do texto
    text = "S"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (tamanho - text_width) // 2
    y = (tamanho - text_height) // 2
    
    draw.text((x, y), text, fill=cor_texto, font=font)
    
    # Salva
    img.save(f'icons/icon-{tamanho}x{tamanho}.png')
    print(f'Ícone {tamanho}x{tamanho} criado!')
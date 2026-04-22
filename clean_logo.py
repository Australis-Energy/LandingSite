from PIL import Image
import sys

def make_transparent(input_path, output_path, tolerance=30):
    img = Image.open(input_path)
    img = img.convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        # Check if pixel is near white
        if item[0] > 255 - tolerance and item[1] > 255 - tolerance and item[2] > 255 - tolerance:
            newData.append((255, 255, 255, 0)) # transparent
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")

make_transparent("public/uploads/7bf2a95a-42ca-4004-aee8-ecd6db3aa1da.png", "public/uploads/geovation-clean.png", 50)

import os, base64
os.makedirs('public/images/posts', exist_ok=True)
b='iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII='
with open('public/images/posts/formato.png','wb') as f:
    f.write(base64.b64decode(b))
print('placeholder created')

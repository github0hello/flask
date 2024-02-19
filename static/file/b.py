import cv2

# 图片读入

img = cv2.cvtColor(cv2.imread(input('请输入要处理文件路径：'), cv2.IMREAD_UNCHANGED),
                   cv2.COLOR_RGB2RGBA)
# 图片处理
print('处理中........................')
for i in range(img.shape[0]):
    for j in range(img.shape[1]):
        if img[i, j, 0] == 255 and img[i, j, 1] == 255 and img[i, j, 2] == 255:
            img[i, j, 3] = 0
print('-------------------------处理完成-------------------------')
cv2.imwrite(input('请输入文件保存路径：'), img)


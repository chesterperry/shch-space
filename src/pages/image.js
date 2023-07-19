import React, { useState } from 'react';

function ImageManipulation() {
  const [imageData, setImageData] = useState(null);

  const handleImageInputChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const image = new Image();
        image.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = image.width;
          canvas.height = image.height;

          const context = canvas.getContext('2d');
          context.drawImage(image, 0, 0);

          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const manipulatedImageData = manipulateImageData(imageData);

          setImageData(manipulatedImageData);
        };
        image.src = e.target.result;
      };

      reader.readAsDataURL(file);
    }
  };

  const manipulateImageData = (imageData) => {
    const originalPixels = imageData.data;
    const originalWidth = imageData.width;
    const originalHeight = imageData.height;
    const STEP = 50;
    const scaledPixels = new Uint8ClampedArray(originalPixels.length);

    const manipulateImageData = (imageData) => {
        const originalPixels = imageData.data;
        const originalWidth = imageData.width;
        const originalHeight = imageData.height;
        const scaledPixels = new Uint8ClampedArray(originalPixels.length);
      
        for (let y = 0; y < originalHeight; y += 10) {
          for (let x = 0; x < originalWidth; x += 10) {
            const startIndex = (y * originalWidth + x) * 4;
            const endIndex = startIndex + 40 * originalWidth * 4;
      
            let totalRed = 0;
            let totalGreen = 0;
            let totalBlue = 0;
            let totalWeight = 0;
      
            // Находим сумму значений каналов и общий вес пикселей в блоке
            for (let i = startIndex; i < endIndex; i += originalWidth * 4) {
              for (let j = i; j < i + 40 * 4; j += 4) {
                const red = originalPixels[j];
                const green = originalPixels[j + 1];
                const blue = originalPixels[j + 2];
                const brightness = (red + green + blue) / 3;
                const weight = brightness / 255; // Вес, пропорциональный яркости пикселя
      
                totalRed += red * weight;
                totalGreen += green * weight;
                totalBlue += blue * weight;
                totalWeight += weight;
              }
            }
      
            // Вычисляем усредненные значения каналов
            const averageRed = Math.floor(totalRed / totalWeight);
            const averageGreen = Math.floor(totalGreen / totalWeight);
            const averageBlue = Math.floor(totalBlue / totalWeight);
      
            // Заполняем пиксели блока усредненными значениями каналов
            for (let i = startIndex; i < endIndex; i += originalWidth * 4) {
              for (let j = i; j < i + 40 * 4; j += 4) {
                scaledPixels[j] = averageRed;       // Красный канал
                scaledPixels[j + 1] = averageGreen; // Зеленый канал
                scaledPixels[j + 2] = averageBlue;  // Синий канал
                scaledPixels[j + 3] = originalPixels[j + 3]; // Альфа-канал
              }
            }
          }
        }
      
        return new ImageData(scaledPixels, originalWidth, originalHeight);
      };
      
  
    for (let y = 0; y < originalHeight; y += STEP) {
      for (let x = 0; x < originalWidth; x += STEP) {
        const centerX = x + STEP/2; // Центр круга по оси X
        const centerY = y + STEP/2; // Центр круга по оси Y
  
        for (let i = 0; i < STEP; i++) {
          for (let j = 0; j < STEP; j++) {
            const currentX = x + i;
            const currentY = y + j;
            const pixelIndex = (currentY * originalWidth + currentX) * 4;
  
            // Проверяем, находится ли текущий пиксель внутри круга
            const distance = Math.sqrt((currentX - centerX) ** 2 + (currentY - centerY) ** 2);
            if (distance <= STEP/2) {
              // Если пиксель находится внутри круга, копируем его цвет из исходного изображения
              scaledPixels[pixelIndex] = originalPixels[pixelIndex]; // Красный канал
              scaledPixels[pixelIndex + 1] = originalPixels[pixelIndex + 1]; // Зеленый канал
              scaledPixels[pixelIndex + 2] = originalPixels[pixelIndex + 2]; // Синий канал
              scaledPixels[pixelIndex + 3] = originalPixels[pixelIndex + 3]; // Альфа-канал
            } else {
              // Если пиксель находится за пределами круга, устанавливаем белый цвет
              scaledPixels[pixelIndex] = 255; // Красный канал
              scaledPixels[pixelIndex + 1] = 255; // Зеленый канал
              scaledPixels[pixelIndex + 2] = 255; // Синий канал
              scaledPixels[pixelIndex + 3] = 255; // Альфа-канал
            }
          }
        }
      }
    }
  
    return new ImageData(scaledPixels, originalWidth, originalHeight);
  };
  
  
  
  
  

  return (
    <div>
      <input type="file" onChange={handleImageInputChange} />
      {imageData && (
        <canvas
          width={imageData.width}
          height={imageData.height}
          ref={(canvas) => {
            if (canvas) {
              const context = canvas.getContext('2d');
              context.putImageData(imageData, 0, 0);
            }
          }}
        />
      )}
    </div>
  );
}

export default ImageManipulation;

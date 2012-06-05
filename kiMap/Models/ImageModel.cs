using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;

namespace kiMap.Models
{
    public class ImageModel
    {
        [Required]
        public HttpPostedFileWrapper ImageUploaded { get; set; }

        public static void ResizeAndSave(string savePath, string fileName, Stream imageBuffer, int maxSideSize, bool makeItSquare, bool originalSize)
        {
            int newWidth;
            int newHeight;
            Image image = Image.FromStream(imageBuffer);
            int oldWidth = image.Width;
            int oldHeight = image.Height;
            Bitmap newImage;
            if(makeItSquare)
            {
                int smallerSide = oldWidth >= oldHeight ? oldHeight : oldWidth;
                double coeficient = maxSideSize / (double)smallerSide;
                newWidth = Convert.ToInt32(coeficient * oldWidth);
                newHeight = Convert.ToInt32(coeficient * oldHeight);
                Bitmap tempImage = new Bitmap(image,newWidth, newHeight);
                int cropX = (newWidth - maxSideSize) / 2;
                int cropY = (newHeight - maxSideSize) / 2;
                newImage = new Bitmap(maxSideSize, maxSideSize);
                Graphics tempGraphic = Graphics.FromImage(newImage);
                tempGraphic.SmoothingMode = SmoothingMode.AntiAlias;
                tempGraphic.InterpolationMode = InterpolationMode.HighQualityBicubic;
                tempGraphic.PixelOffsetMode = PixelOffsetMode.HighQuality;
                tempGraphic.DrawImage(tempImage, new Rectangle(0, 0, maxSideSize, maxSideSize), cropX, cropY, maxSideSize, maxSideSize, GraphicsUnit.Pixel);
            }
            else
            {
                if (!originalSize)
                {
                    int maxSide = oldWidth >= oldHeight ? oldWidth : oldHeight;

                    if (maxSide > maxSideSize)
                    {
                        double coeficient = maxSideSize / (double)maxSide;
                        newWidth = Convert.ToInt32(coeficient * oldWidth);
                        newHeight = Convert.ToInt32(coeficient * oldHeight);
                    }
                    else
                    {
                        newWidth = oldWidth;
                        newHeight = oldHeight;
                    }
                    newImage = new Bitmap(image, newWidth, newHeight);
                }
                else
                {
                    newImage = new Bitmap(image, image.Width, image.Height);
                }

            }
            newImage.Save(savePath + fileName + ".jpg", ImageFormat.Jpeg);
            image.Dispose();
            newImage.Dispose();

        }

    }

}
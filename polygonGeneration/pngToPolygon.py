import numpy as np
from skimage import io, measure, morphology
from skimage.io import imsave, imread
from matplotlib import pyplot as plt

# Take in image path, the latitude and longitude of the corners of the image
def getCoordinatesArray(imgName,corners):
  img = io.imread(imgName, as_gray=True)
  # do thresholding
  mask = img < 0.7

  plt.matshow(mask, cmap='gray')

  # ij coords of perimeter
  coords = np.nonzero(mask)
  
  print(coords)

center = [28.7039,77.1025]
corners = {'top-left':[28.7040,77.1024],'top-right':[28.7040,77.1026],'bottom-left':[28.7038,77.1024],'bottom-right':[28.7038,77.1026]}

getCoordinatesArray('testMap.png',corners)

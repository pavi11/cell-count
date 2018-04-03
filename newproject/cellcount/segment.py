import tensorflow as tf
import numpy as np
import os,glob,cv2
import sys,argparse
from django.http import HttpResponse
from django.shortcuts import render
import cv2
from matplotlib import pyplot as plt


def findCellsBoundary(imgPath):
    img = cv2.imread(imgPath)
    print(img.shape)
    Z = img.reshape((-1,3))
    Z = np.float32(Z)
    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 10, 1.0)
    K = 3
    ret,label,center=cv2.kmeans(Z,K,None,criteria,10,cv2.KMEANS_RANDOM_CENTERS)
    center = np.uint8(center)
    res = center[label.flatten()]
    res2 = res.reshape((img.shape))
    gray = cv2.cvtColor(res2,cv2.COLOR_BGR2GRAY)
    ret, thresh = cv2.threshold(gray,0,255,cv2.THRESH_BINARY_INV+cv2.THRESH_OTSU)
    kernel = np.ones((7,7),np.uint8)
    thresh = cv2.erode(thresh,kernel,iterations = 1)
    thresh = cv2.Canny(thresh,100,200)
    im2, contours, hierarchy = cv2.findContours(thresh,cv2.RETR_TREE,cv2.CHAIN_APPROX_SIMPLE)
    
    count = 0
    hCount = 0
    while count < len(contours) and hCount < len(hierarchy[0]):
        if hierarchy[0][hCount][3] != -1:
            del contours[count]
        else:
            count += 1
        hCount += 1
    
    boundaryPoints = []

for cnt in contours:
    x,y,w,h = cv2.boundingRect(cnt)
        cv2.rectangle(res2,(x,y),(x+w,y+h),(0,0,255),1)
        boundaryPoints.append({'x1' : x, 'y1' : y, 'x2' : x + w, 'y2' : y + h})
    
    # cv2.imshow('contours',res2)
    # cv2.waitKey(0)
    return boundaryPoints

def segmentImage(imgPath, boundaryList, label):
    img = cv2.imread(imgPath)
    for i in range(0, len(boundaryList)):
        segment = np.zeros((img.shape[0], img.shape[1], 3), np.uint8)
        for x in range(boundaryList[i]['x1'], boundaryList[i]['x2']-1):
            for y in range(boundaryList[i]['y1'], boundaryList[i]['y2']-1):
                segment[y][x] = img[y][x]
        cv2.imwrite('/Users/pavithra.g/Desktop/newproject/cellcount/Train/Test/'+str(i)+'.jpg', segment)

filename = '/Users/pavithra.g/Desktop/newproject/cellcount/'+filenameParam
    # Call Segmentation
boundaryPoints = findCellsBoundary(filename)
segmentImage(filename, boundaryPoints, 'type1')
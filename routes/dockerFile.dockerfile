#Dockerfile, Image, Container
FROM python3:  3.8.10
ADD mainUseImport.py 3.8.10
#use pip for any packages that are 
#used.
#pip install  xxxx  xxxx
CMD ["python", "./mainUseImport.py"]
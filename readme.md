# curvebench

A Simple benchmark for various implementations of the ed25519
digital signature algorithm.

*Native bindings - 1,000,000 iterations:*

|            |ed25519    |sodium    |dalek     |
|------------|----------:|---------:|---------:|
|**generate**|42,079.827 |23,811.203|23,561.029|
|**sign**    |41,084.805 |24,673.802|25,663.488|
|**verify**  |122,165.042|73,532.160|45,741.554|

*Pure javascript - 10,000 iterations*:

|            |tweetnacl |elliptic 
|------------|---------:|---------:
|**generate**|41,614.610|5,861.377 
|**sign**    |40,215.498|6,036.979 
|**verify**  |82,331.073|42,323.612

All numbers are from tests run on a 3GHz MacBook Pro

Copyright &copy; 2019 Future Tense, LLC

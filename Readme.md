# FiFispeaker
System inteligentnego przełączania głośników w zależności od położenia użytkownika.

## Instalacja
Jak skompilowac wszystko poprawnie:

### 1. APK

1. polaczyc telefon i komputer w jedna siec (aby nie robic problemu z przekierowywaniem portow w routerach itp)
2. wejsc w plik App.js i zmienic adres serwera na swoj lokalny (port zostawiamy :8999)
3. (opcjonalnie) mozemy zmienic timeout czyli czestosc odwiezania

#### Budowanie aplikacji
1. Zainstalowac na komputerze NodeJS [Pobierz](https://nodejs.org/en/download/)

2. Powinnismy miec mozliwosc uzycia npm, wiec wpisujemy komende:
```
npm install -g create-react-native-app
```

3. Podlaczyc telefon z trybem debuggowania usb.

4. Aby uniknac bledow musimy uruchomic wczesniej serwer.

5. Wchodzimy terminalem do folderu "apk" i wpisujemy komende:
```
react-native run-android
```
#### Błędy
1. Jesli wystapia bledy zolte to sa one pomijalnie niewazne (bledy wyskakuja gdyz aplikacja jest w fazie debug, a nie release)

2. Jesli mamy do czynienia z bledem czerwonym wtedy moga wystapic 2 rzeczy:
 	1) odlaczylismy telefon od komputera
	2) nie zostal wlaczony serwer

Solucja: 
1. Step-by-step:
	- potrzasnac telefonem aby wywolac menu opcji
	- wybrac dev settings
	- kliknac "Debug server host&port for device"
	- wpisac ten sam adres lokalny serwera ktory mamy tylko z portem 8081
	- kliknac ok i wyjsc z tego menu
	- potrzasnac telefonem i nacisnac "Enable Live Reload"
	- potrzasnac telefonem i nacisnac "Enable Hot Reloading"
	- za pomoca terminala zrobic jeszcze raz build aplikacji

1. W przypadku błędów:
	- sprawdzić czy mamy połączenie z serwerem
	- wylaczyc serwer i wlaczyc go ponownie, a potem uruchomic ponownie aplikacje

--------------

### 2. Serwer

1. Edytowac plik _index.js_
	_Wszystkie potrzebne informacje co do edycji znajduja sie w komentarzach zmiennej **"positionMap"**_

2. Zadbac o poprawne wpisanie adresow 

3. Uruchomic terminal w tym folderze i wpisac komende:
```
node index.js
```
## Współtwórcy

Chciałbym podziękować serdecznie [@tizgane](https://github.com/tizgane) za współpracę przy etapie projektowania i implementacji projektu oraz [@Grushenko](https://github.com/Grushenko) za pomoc przy React-Native

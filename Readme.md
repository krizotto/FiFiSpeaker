Jak skompilowac wszystko poprawnie:

1) apk

1.1 polaczyc telefon i komputer w jedna siec (aby nie robic problemu z przekierowywaniem portow w routerach itp)
1.2 wejsc w plik App.js i zmienic adres serwera na swoj lokalny (port zostawiamy :8999)
1.3 (opcjonalnie) mozemy zmienic timeout czyli czestosc odwiezania

BUILD
1.4 Zainstalowac na komputerze NodeJS (https://nodejs.org/en/download/)

1.5 Powinnismy miec mozliwosc uzycia npm, wiec wpisujemy komende:
	npm install -g create-react-native-app

1.6 Podlaczyc telefon z trybem debuggowania usb.

1.7 Aby uniknac bledow musimy uruchomic wczesniej serwer.

1.8 Wchodzimy terminalem do folderu "apk" i wpisujemy komende:
	react-native run-android

1.9 Jesli wystapia bledy zolte to sa one pomijalnie niewazne (bledy wyskakuja gdyz aplikacja jest w fazie debug, a nie release)

1.10 Jesli mamy do czynienia z bledem czerwonym wtedy moga wystapic 2 rzeczy:
 	1) odlaczylismy telefon od komputera
	2) nie zostal wlaczony serwer

Solucion: 
	1) step by step:
		- potrzasnac telefonem aby wywolac menu opcji
		- wybrac dev settings
		- kliknac "Debug server host&port for device"
		- wpisac ten sam adres lokalny serwera ktory mamy tylko z portem 8081
		- kliknac ok i wyjsc z tego menu
		- potrzasnac telefonem i nacisnac "Enable Live Reload"
		- potrzasnac telefonem i nacisnac "Enable Hot Reloading"
		-za pomoca terminala zrobic jeszcze raz build aplikacji

	2) 	-sprawdzic czy jest polaczenie z internetem
		-wylaczyc serwer i wlaczyc go ponownie, a potem uruchomic ponownie aplikacje


--------------

2) server

2.1 Edytowac plik index.js
	Wszystkie potrzebne informacje co do edycji znajduja sie w komentarzach zmiennej "positionMap"

2.2 Zadbac o poprawne wpisanie adresow 

2.3 Uruchomic terminal w tym folderze i wpisac komende:
	node index.js


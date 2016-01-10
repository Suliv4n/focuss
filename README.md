# Focuss 

Focuss est un script client-serveur qui permet de recharger des fichiers css dans une page web sans recharger la page.

# Install and usage

## How to install :
```bash
git pull https://github.com/darklev/focuss.git
npm install
```
## How to use

### Server :

Configure "config.json" file :
```
{
	"config" : {
		"www.example.local" : {
			"focuss" : {
				"/var/www/example/mystyle.css" : "/mystyle.css"
			}
		}
	}
}
```

Replace "www.example.local" by your page URL.
Then put all the css file you want to "focuss" in the "focuss" object :
Key => path to the css file you want to focuss
Value => url to the css file focussed


### Client :

Add this script to your webpage :
http://localhost:3000/focuss_client.js

Example in php :
```php/html
<?php if(ENVIRONMENT == "development"){ ?>
    <script type="text/javascript" src="http://localhost:3000/socket.io/socket.io.js"></script>
    <script type="text/javascript" src="http://localhost:3000/focuss_client.js"></script>
<?php } ?>
```

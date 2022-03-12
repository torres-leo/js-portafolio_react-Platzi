# js-portfolio
API: [random user](https://randomuser.me/api/)

## Configuración de webpack.config.js

- El archivo de configuración nos va ayudar a poder establecer la configuración y elementos que vamos a utilizar.
- Para poder crear el archivo de configuración en la raíz del proyecto creamos un archivo llamado webpack.config.js.

En el mismo debemos decir
 - El punto de entrada.
 - Hacia a donde a enviar la configuración de nuestro proyecto.
 - Las extensiones que vamos usar.
 - El flag "—config" indica donde estará nuestro archivo de configuración
 ```npx
npx webpack --mode production --config webpack.config.js
 ```

- Para poder hacerlo más amigable el comando puedes crear un script en "package.json"

```json
"scripts": {
		...
    "build": "webpack --mode production --config webpack.config.js"
  },
```
### Babel Loader para JavaScript

- Babel te permite hacer que tu código JavaScript sea compatible con todos los navegadores.
- Debes agregar a tu proyecto las siguientes dependencias.

NPM 
```npm
npm install babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime -D
```

- babel-loader nos permite usar babel con webpack
- @babel/core es babel en general
- @babel/preset-env trae y te permite usar las ultimas características de JavaScript
- @babel/plugin-transform-runtime te permite trabajar con todo el tema de asincronismo como ser *async* y *await*
- Debes crear el archivo de configuración de babel el cual tiene como nombre ".babelrc"

### HtmlWebpackPlugin

Es un plugin para inyectar javascript, css, favicons, y nos facilita la tarea de enlazar los bundles a nuestro template HTML.

NPM
```npm
npm i html-webpack-plugin -D
```

**Configuración**}
```javascript
plugins: [
        new HtmlWebpackPlugin({ 
		inject: 'body',
		template: './public/index.html'
		filename: './index.html'
	})
]
```

## Loader y Plugins

- Loaders: fuera de contexto, webpack solamente entiende JavaScript y JSON. Los loaders nos permite procesar archivos de otros tipos para convertirnos en módulos válidos que serán consumidos por nuestras aplicaciones y agregadas como dependencias. 
  En alto nivel, los loaders poseen 2 configuraciones principales:
    - test - propiedad que identifica cuáles archivos deberán ser transformados.
    - use - propiedad que identifica el loader que será usado para transformar a dichos archivos.

- Plugins: mientras los loaders transforman ciertos tipos de módulos, los plugins son utilizados para extender tareas específicas, como la optimización de paquetes, la gestión de activos y la inyección de variables de entorno. Una vez importado el plugin, podemos desear el personalizarlos a través de opciones.

### loaders Css y Preprocesadores de Css

Un preprocesador CSS es un programa que te permite generar CSS a partir de la syntax única del preprocesador. Existen varios preprocesadores CSS de los cuales escoger, sin embargo, la mayoría de preprocesadores CSS añadirán algunas características que no existen en CSS puro, como variable, mixins, selectores anidados, entre otros. Estas características hacen la estructura de CSS más legible y fácil de mantener.

post procesadores son herramientas que procesan el CSS y lo transforman en una nueva hoja de CSS que le permiten optimizar y automatizar los estilos para los navegadores actuales.

```npm
npm i mini-css-extract-plugin css-loader -D
```

- css-loader ⇒ Loader para reconocer CSS
- mini-css-extract-plugin ⇒ Extrae el CSS en archivos.
- Para comenzar debemos agregar las configuraciones de webpack

**configuracion**
```javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	...,
	module: {
    rules: [
      {
        test: /\.(css|\styl)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
        ]
      }
    ]
  },
  plugins: [
		...
    new MiniCssExtractPlugin(),
  ]
}
```

- Si deseamos posteriormente podemos agregar herramientas poderosas de CSS como ser:
  - pre procesadores
        - Sass
        - Less
        - Stylus
  - post procesadores
        - Post CSS

### Copia de archivos con Webpack

- Si tienes la necesidad de mover un archivo o directorio a tu proyecto final podemos usar un plugin llamado “copy-webpack-plugin”.
- Para instalarlo debemos ejecutar el comando
NPM 
```npm
npm i copy-webpack-plugin -D
```
- Para poder comenzar a usarlo debemos agregar estas configuraciones a "webpack.config.js".

**configuracion**
```javascript
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	...
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets/images"),
          to: "assets/images"
        }
      ]
    }),
  ]
}
```

- Es importante las propiedades from y to
    - From ⇒ que recurso (archivo o directorio) deseamos copiar al directorio final
    - To ⇒ en que ruta dentro de la carpeta final terminara los recursos

### Loaders de imágenes
- Puedes usar una forma de importar las imágenes haciendo un import de las mismas y generando una variable.
- No es necesario instalar ninguna dependencia, webpack ya lo tiene incluido debemos agregar la siguiente configuración.

**configuracion**
```javascript
module.exports = {
	...
  module: {
    rules: [
      {
        test: /\.png/,
        type: "asset/resource"
      }
    ]
  },
}
```

### Loaders de fuentes

Cuando utilizamos fuentes externas una buena práctica es descargarlas a nuestro proyecto. Debido a que no hara un llamado a otros sitios.

Por ello es importante usarlo dentro de webpack

Para esta tarea instalaras y usaras “file-loader” y “url-loader”

NPM
```npm
npm install url-loader file-loader -D
```

- Para aplicar esta configuración debes agregar la siguiente información: 
**configuracion**
```javascript
module: {
	rules: [
		// Configuración para "fonts"
		{
			test: /\.(woff|woff2|eot|ttf|otf)$/i,
			type: 'asset/resource',
			generator: {
				filename: 'assets/fonts/[hash][ext]',
			},
		},
	],
}
```

- Es importante que dentro de los estilos agregues @font-face: 

```css
@font-face {
	font-family: "Ubuntu";
	src: url("../assets/fonts/ubuntu-regular.woff2") format('woff2'),
			 url("../assets/fonts/ubuntu-regular.woff") format('woff');
	font-weight: 400;
	font-style: normal;
}
```

### Terser en webpack
La documentación oficial de webpack nos comunica que actualmente terser-webpack-plugin viene incluido desde webpack 5.

```js
module.exports = {
... 
optimization: {
    minimize: true
  }
}
```
### Webpack Alias
- Alias ⇒ nos permiten otorgar nombres paths específicos evitando los paths largos
- Para crear un alias debes agregar la siguiente configuración a webpack

**configuracion**
```js
module.exports = {
	...
	resolve: {
		...
    alias: {
      '@nombreDeAlias': path.resolve(__dirname, 'src/<directorio>'),
    },
	}
}
```
- Puedes usarlo en los imports de la siguiente manera: 
```js
import modulo from "@ejemplo/archivo.js";
```

## Variables de entorno

Es importante considerar las variables de entorno va a ser un espacio seguro donde podemos guardar datos sensibles
    Por ejemplo, subir llaves al repositorio no es buena idea cuando tienes un proyecto open source

Para instalar debemos correr el comando
NPM

```npm
npm install -D dotenv-webpack
```

Posteriormente debemos crear un archivo **.env** donde estarán la clave para acceder a la misma y el valor que contendrán

archivo .env = 
```
API=https://randomuser.me/api/
```
Es buena idea tener un archivo de ejemplo donde, el mismo si se pueda subir al repositorio como muestra de que campos van a ir
Una vez creado el archivo .env debemos agregar la siguiente configuración en **webpack.config.js**

**configuracion**
```js
const Dotenv = require('dotenv-webpack');
module.exports = {
	...
	plugins: [
		new Dotenv()
  ],
}
```

- dotenv-webpack ⇒ Leera el archivo .env por defecto y lo agregar a nuestro proyecto.

Para usarlas debes hacer lo siguiente

## Webpack en modo desarrollo

Creamos un nuevo archivo:
**webpack.config.dev.js**
Copiamos todo lo de webpack.config.js a el archivo que acabamos de crear.
Borramos o comentamos el siguiente código, ya que no necesitamos optimizar para el modo de desarrollo (Queremos ver cuando funcionan las cosas):
```js
  optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    }
```
También borramos o comentamos por la misma razón:
```js
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')
```

Seguido del atributo output añadimos:
```js
output: {
},
mode: 'development',
```

- En package.json:
```json
"dev": "webpack --config webpack.config.dev.js" 
```
Ejecutar 
```npm 
npm run dev
```

## Limpiar el directorio para el modo producción

A partir de WebPack 5.20.0 + no es necesario instalar el Clean-webpack-plugin. Con colocar en el output clean: true siempre limpiará el directorio antes.

```js
output: {
    ...
    clean: true,
}
```

## watch

La forma más común en la que el watch se suele usar dentro de un archivo package.json es esta:

```js
"dev": "webpack --config webpack.config.dev.js",
"watch": "npm run dev --watch"
```

configurarlo en el webpack.config.js =
```js
module.exports = {
	...
	watch: true
}
```

## Subiendo el programa a netlify

Lo primero que debemos hacer es crear una cuenta en Netlify. Lo siguiente es crear un archivo en la raíz del proyecto llamado netlify.toml el cual va a llevar la siguiente configuración:

### **netlify.toml**
[build]
    publish = "dist" // ¿cual va a ser la carpeta a publicar?
    command = "npm run build" // Comando a ejecutar para el deploy

Para el siguiente paso debemos ya tener nuestro repositorio en algún servicio de la nube, como Github. Ahora, vamos a la pagina de Netlify para crear el nuevo sitio.

Crear nuevo sitio → Seleccionar nube (Github) → Elegir repositorio y rama a subir → Deploy

Apartir de ahora Netlify nos levanta el servidor de manera gratuita, este proceso puede ser lento ya que es un servicio gratuito. En el summary de nuestro deploy podemos ver el log del build donde podriamos ver los errores presentes.

En el proyecto actual, al hacer uso de una variable de entorno, necesitamos realizar la siguiente configuración para que Netlify pueda trabajar con ella: Creamos una carpeta llamada scripts/ y adentro de esta carpeta vamos a crear un archivo llamado create-env.js. En este archivo vamos a colocar este código.

// **create-env.js**
```js
const fs = require('fs'); // fs = file system

// fs.writeFileSync("path", `argumento a crear`);
fs.writeFileSync("./.env", `API=${process.env.API}\n`);
```

Pero ¿de dónde vamos a obtener/setear el process.env? Lo vamos a asignar en netlify, en nuestro deploy vamos a buscar la Sección de Enviroment → Enviroment Variables → Edit Variables. En nuestro caso la llamaremos API y asignaremos el valor de nuestro API: https://randomuser.me/api/

Ahora, debemos ejecutar este script antes de ejecutar el comando de build, para que sea enviado a netlify. Vamos a nuestro package.json y vamos a modificar el script build de la siguiente manera:

```json
"scripts": {
    ...
    "build": "node ./scripts/create-env.js && webpack --config webpack.config.js",
  }
```

### Webpack Dev Server
```npm
npm install -D webpack-dev-server
```
Posteriormente debemos agregar la siguiente configuración en webpack.config.dev.js
Lo hacemos en la configuración de desarrollo debido a que esta característica solo nos ayudara a ver cambios al momento de desarrollar la aplicación.

```js
module.exports = {
	...
	devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    port: 3000,
  }
}
```
En la configuración podemos observar lass siguientes propiedades
contentBase ⇒ Le dice al servidor donde tiene que servir el contenido, solo es necesario si quieres servir archivos estáticos
compress ⇒ Habilita la compresión gzip
historyApiFallback ⇒ cuando estas usando HTML5 History API la página index.html sera mostrada en vez de una respuesta 404
Port ⇒ es el puerto donde vamos a realizar las peticiones
Para comenzar a utilizarlo debes agregar el siguiente script a package.json
```json
{
	...
	"scripts": {
	...
	"start": "webpack serve --config webpack.config.dev.js"
	}
}
```

## Webpack Bundle Analyzer

Cuando tenemos un proyecto es buena idea poder revisar su impacto en tamaño por ese motivo webpack nos ofrece un paquete para poder verificar y analizar el tamaño del bundle final
Para instalar corremos el comando

NPM
```npm
npm install -D webpack-bundle-analyzer 
```

Si deseamos hacer un análisis debemos correr los siguientes comandos:

```npx
npx webpack --profile --json > stats.json
```

## Webpack DevTools

source map es un mapeo que se realiza entre el código original y el código transformado, tanto para archivos JavaScript como para archivos CSS. De esta forma podremos debuggear tranquilamente nuestro código.

Con las devtools de webpack te permite crear un mapa de tu proyecto y con el podemos:
- Leer a detalle.
- Analizar particularidades de lo que está compilando nuestro proyecto 

Para configurarlo debemos ir a **webpack.config.js** y agregar la propiedad *devtool: "source-map"*

Esta opción genera un source map el cual posteriormente chrome lo lee y te permite depurar de una mejor forma.
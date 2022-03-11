# js-portfolio
API: [random user](https://randomuser.me/api/)

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
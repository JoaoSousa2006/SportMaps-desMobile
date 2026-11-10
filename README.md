# SportMaps-desMobile

## Mapa

O mapa usa Esri World Street Map por padrão, sem chave de API e sem requisitar tiles aos servidores públicos do OSM ou ao CARTO. Para usar os tiles do MapTiler, copie `frontend/.env.example` para `frontend/.env.local`, configure `VITE_MAPTILER_KEY` com uma chave criada em [maptiler.com](https://www.maptiler.com/), e reinicie o servidor Vite. Não publique a chave em repositórios públicos. Atribuição e parâmetros do `TileLayer` seguem a [referência do Leaflet](https://leafletjs.com/reference.html#tilelayer).
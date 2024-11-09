(function(){
    function checkGeoFSViewerStatus() {
        if (typeof geofs === 'undefined') return false;
        if (!geofs.api || !geofs.api.viewer) return false;
        return true;
    }

    function addHighResEsriWorldImageryLayer() {
        const viewer = geofs.api.viewer;
        try {
            const esriImageryProvider = new Cesium.UrlTemplateImageryProvider({
                url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
                credit: "Esri World Imagery",
                tileWidth: 512,
                tileHeight: 512,
                minimumLevel: 0,
                maximumLevel: 19,
                tilingScheme: new Cesium.WebMercatorTilingScheme()
            });
            const esriLayer = viewer.imageryLayers.addImageryProvider(esriImageryProvider);
            esriLayer.alpha = 1.0;
            esriLayer.brightness = 0.9;
            console.log("High-resolution Esri World Imagery has been applied.");
        } catch (e) {
            console.error("Error applying Esri World Imagery:", e);
        }
    }

    function initEsriLayer() {
        if (checkGeoFSViewerStatus()) {
            addHighResEsriWorldImageryLayer();
        } else {
            console.log("GeoFS not ready, retrying in 1 second...");
            setTimeout(initEsriLayer, 1000);
        }
    }

    initEsriLayer();
})();

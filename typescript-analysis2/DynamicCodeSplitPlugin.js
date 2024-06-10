const { sources } = require('webpack');

class DynamicCodeSplitPlugin {
  apply(compiler) {
    compiler.hooks.emit.tapAsync('DynamicCodeSplitPlugin', (compilation, callback) => {
      const maxChunkSize = 100 * 1024; // 100 KB
      const assets = compilation.assets;
      
      // Use Webpack's cache API
      const cache = compilation.getCache('DynamicCodeSplitPlugin');
      
      Promise.all(Object.keys(assets).map(async (filename) => {
        const asset = assets[filename];
        const cacheItem = cache.getItemCache(filename, cache.getLazyHashedEtag(asset));
        
        const cachedResult = await cacheItem.getPromise();
        if (cachedResult) {
          assets[filename] = cachedResult;
          return;
        }

        // Dynamic splitting of large assets
        if (asset.size() > maxChunkSize) {
            // Split the asset into smaller chunks
          const content = asset.source();
          const numChunks = Math.ceil(content.length / maxChunkSize);
          for (let i = 0; i < numChunks; i++) {
            const chunkFilename = `${filename.replace(/\.js$/, '')}.chunk${i}.js`;
            const chunkContent = content.slice(i * maxChunkSize, (i + 1) * maxChunkSize);
            assets[chunkFilename] = new sources.RawSource(chunkContent);
          }
            // Remove the original large asset
          delete assets[filename];
        }

        // Cache the result
        await cacheItem.storePromise(assets[filename]);
      })).then(() => callback()).catch(callback);
    });
  }
}

module.exports = DynamicCodeSplitPlugin;

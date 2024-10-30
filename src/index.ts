import fetch from 'node-fetch';
import mime from 'mime-types';
import { Buffer } from 'node:buffer';

export function inlineExternalAssets() {
  return {
    name: 'vite-plugin-inline-external-assets',
    async transformIndexHtml(html: string) {
      const externalUrls = [];

      const regex = /<(?:[a-zA-Z]+)[^>]*(?:src|href)="(https?:\/\/[^"]+)"[^>]*>/g;
      let match;

      while ((match = regex.exec(html)) !== null) {
        externalUrls.push(match[1]);
      }

      let didGetError = false;

      for (const url of externalUrls) {
        try {
          const response = await fetch(url, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.66 Safari/537.36'
            }
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
            continue;
          }

          const buffer = await response.arrayBuffer();
          if (!buffer || buffer.byteLength === 0) {
            throw new Error(`Empty buffer for ${url}`);
            continue;
          }

          const mimeType = mime.lookup(url) || 'application/octet-stream';
          const base64 = Buffer.from(buffer).toString('base64');
          const dataUri = `data:${mimeType};base64,${base64}`;
          
          html = html.replace(new RegExp(url, 'g'), dataUri);
        } catch (error) {
          console.error(`Failed to inline ${url}:`, error);
	  didGetError = true;
        }
      }

      if(didGetError) {
	throw new Error("Inlining dependencies failed because of previously printed errors");
      }

      return html;
    },
  };
}


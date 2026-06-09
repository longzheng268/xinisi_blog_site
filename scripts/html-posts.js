/* global hexo */

'use strict';

// Register .html files as posts
hexo.extend.renderer.register('html', 'html', data => {
  return data.text;
});

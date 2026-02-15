/**
 * TRIBUTE LANDS — ENCODING FIX
 * Comprehensive UTF-8 mojibake correction for all tools
 * 
 * Fixes common encoding issues that occur when UTF-8 text is 
 * misinterpreted as Windows-1252 or ISO-8859-1
 */

window.EncodingFix = {
  // Comprehensive list of mojibake patterns and their corrections
  patterns: [
    // Em dash variations
    [/â€"/g, '—'],
    [/â€"/g, '—'],
    [/\u00e2\u0080\u0093/g, '—'],
    
    // En dash
    [/â€"/g, '–'],
    [/\u00e2\u0080\u0093/g, '–'],
    
    // Single quotes
    [/â€™/g, '''],
    [/â€˜/g, '''],
    [/\u00e2\u0080\u0099/g, '''],
    [/\u00e2\u0080\u0098/g, '''],
    
    // Double quotes
    [/â€œ/g, '"'],
    [/â€\u009d/g, '"'],
    [/â€/g, '"'],
    [/\u00e2\u0080\u009c/g, '"'],
    [/\u00e2\u0080\u009d/g, '"'],
    
    // Ellipsis
    [/â€¦/g, '…'],
    [/\u00e2\u0080\u00a6/g, '…'],
    
    // Currency
    [/Â£/g, '£'],
    [/\u00c2\u00a3/g, '£'],
    [/â‚¬/g, '€'],
    
    // Other symbols
    [/Â°/g, '°'],
    [/Â±/g, '±'],
    [/Â½/g, '½'],
    [/Â¼/g, '¼'],
    [/Â¾/g, '¾'],
    [/â€¢/g, '•'],
    [/Ã—/g, '×'],
    [/Ã·/g, '÷'],
    
    // Accented characters (common in fantasy names)
    [/Ã©/g, 'é'],
    [/Ã¨/g, 'è'],
    [/Ã /g, 'à'],
    [/Ã¢/g, 'â'],
    [/Ã´/g, 'ô'],
    [/Ã»/g, 'û'],
    [/Ã§/g, 'ç'],
  ],
  
  /**
   * Fix encoding issues in a string
   * @param {string} text - Text to fix
   * @returns {string} Fixed text
   */
  fix: function(text) {
    if (!text || typeof text !== 'string') return text;
    
    let fixed = text;
    this.patterns.forEach(([pattern, replacement]) => {
      fixed = fixed.replace(pattern, replacement);
    });
    
    return fixed;
  },
  
  /**
   * Fix encoding in an HTML element's content
   * @param {HTMLElement} element - Element to fix
   */
  fixElement: function(element) {
    if (!element) return;
    
    // Fix text nodes
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    const textNodes = [];
    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }
    
    textNodes.forEach(node => {
      node.textContent = this.fix(node.textContent);
    });
  },
  
  /**
   * Scan and fix entire document
   */
  fixDocument: function() {
    this.fixElement(document.body);
  }
};

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = window.EncodingFix;
}

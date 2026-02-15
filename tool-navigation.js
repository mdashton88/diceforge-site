/**
 * TRIBUTE LANDS — TOOL NAVIGATION
 * Shared navigation bar for Character Vault, Adventure Vault, and The Foundry
 * 
 * DiceForge Studios Ltd.
 * Version: 1.0
 */

// Add navigation bar to page
function addToolNavigation(currentTool) {
  const tools = [
    { id: 'foundry', label: '🏭 The Foundry', url: 'foundry' },
    { id: 'adventure-vault', label: '🎭 Adventure Vault', url: 'adventure-vault' },
    { id: 'character-vault', label: '👤 Character Vault', url: 'character-vault' }
  ];
  
  // Create nav bar
  const nav = document.createElement('div');
  nav.className = 'tool-nav';
  
  tools.forEach(tool => {
    const button = document.createElement('button');
    button.className = 'tool-nav-item';
    if (tool.id === currentTool) {
      button.classList.add('active');
    }
    button.textContent = tool.label;
    button.onclick = () => {
      if (tool.id !== currentTool) {
        window.location.href = tool.url;
      }
    };
    nav.appendChild(button);
  });
  
  // Insert after header
  const header = document.querySelector('header');
  if (header && header.parentNode) {
    header.parentNode.insertBefore(nav, header.nextSibling);
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // Will be called by each page with their specific tool ID
  });
}

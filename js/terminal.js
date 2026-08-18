/**
 * Portfolio — Interactive Terminal
 */

const DevTerminal = (() => {
  const COMMANDS = {
    help: {
      description: 'Show available commands',
      execute: () => `
╔══════════════════════════════════════════╗
║         DEV OS — Command Reference        ║
╠══════════════════════════════════════════╣
║  help      — Show this help menu          ║
║  about     — Developer information        ║
║  skills    — List technical skills        ║
║  projects  — Show portfolio projects      ║
║  resume    — Career summary               ║
║  contact   — Contact information          ║
║  clear     — Clear terminal output        ║
╚══════════════════════════════════════════╝`,
    },

    about: {
      description: 'Developer information',
      execute: () => `
> Full Stack Developer
> Location: Nepal
> Status: Online & Available

I'm a web developer focused on building modern,
reliable applications with Python, JavaScript,
HTML5, CSS3, Vue.js, Node.js, Express.js,
PostgreSQL, Docker, AWS Cloud, Postman, PyCharm, and data-driven solutions.

Mission: Craft clean digital experiences
Vision:  Build applications that solve real problems
Passion: Clean code, cyberpunk aesthetics, open source`,
    },

    skills: {
      description: 'List technical skills',
      execute: () => `
> SKILL MATRIX LOADED

Languages:  Python, JavaScript (ES6+), SQL, HTML5, CSS3
Frameworks: Node.js, Express.js, Vue.js
Database:   PostgreSQL, SQL
Tools:      Docker, Git, GitHub, VS Code, Ubuntu, Jupyter Notebook, Postman, PyCharm
Cloud:      AWS Cloud
Other:      REST APIs, Machine Learning, Artificial Intelligence, Data Analysis`,
    },

    projects: {
      description: 'Show portfolio projects',
      execute: () => `
> PROJECT DATABASE — MAJOR PROJECTS

[1] Nepal Live Rates — Self Project
    Live: nepal-live-rates.pages.dev
[2] Shova Creation Photography — Client Project
    Live: shovacreation.netlify.app
[3] Agent Racchha — Self Project (Windows AI Agent)

Mini projects (ML, AI, Vue, Python): github.com/pradipNP

Navigate to #portfolio or type: portfolio`,
    },

    resume: {
      description: 'Career summary',
      execute: () => `
> RESUME.DAT — PROFESSIONAL SUMMARY

EXPERIENCE:
  2024-Present  Full Stack Developer (Freelance)
  2023-2024     Web Developer (Independent)

EDUCATION:
  Computer Science / IT — University

FOCUS:
  Python, JavaScript, HTML5, CSS3, Vue.js,
  Node.js, Express.js, PostgreSQL, Docker, AWS Cloud,
  Postman, PyCharm, Machine Learning, Data Analysis`,
    },

    contact: {
      description: 'Contact information',
      execute: () => `
> COMMUNICATION CHANNELS OPEN

Email:    pradipkprajapati27@gmail.com
GitHub:   github.com/pradipNP
LinkedIn: linkedin.com/in/pradipkprajapati

Status:   ● Online — Response within 24h
Location: Nepal`,
    },

    clear: {
      description: 'Clear terminal output',
      execute: () => null,
    },
  };

  let terminalEl, outputEl, inputEl, isOpen = false;
  const commandHistory = [];
  let historyIndex = -1;

  function init() {
    terminalEl = document.getElementById('terminal');
    outputEl = document.getElementById('terminal-output');
    inputEl = document.getElementById('terminal-input');
    if (!terminalEl || !outputEl || !inputEl) return;

    document.getElementById('terminal-toggle')?.addEventListener('click', toggle);
    document.getElementById('terminal-close')?.addEventListener('click', close);
    inputEl.addEventListener('keydown', handleKeyDown);

    printLine('DEV OS Terminal — Type "help" for commands.', 'success');
    printLine('Connection established. Welcome, developer.', 'success');
  }

  function toggle() { isOpen ? close() : open(); }

  function open() {
    isOpen = true;
    terminalEl.hidden = false;
    requestAnimationFrame(() => {
      terminalEl.classList.add('open');
      inputEl.focus();
    });
  }

  function close() {
    isOpen = false;
    terminalEl.classList.remove('open');
    setTimeout(() => { terminalEl.hidden = true; }, 400);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      const command = inputEl.value.trim();
      if (command) {
        executeCommand(command);
        commandHistory.push(command);
        historyIndex = commandHistory.length;
      }
      inputEl.value = '';
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        inputEl.value = commandHistory[historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        inputEl.value = commandHistory[historyIndex];
      } else {
        historyIndex = commandHistory.length;
        inputEl.value = '';
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      autocomplete(inputEl.value.trim());
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      clearOutput();
    }
  }

  function autocomplete(partial) {
    if (!partial) return;
    const matches = Object.keys(COMMANDS).filter((cmd) => cmd.startsWith(partial.toLowerCase()));
    if (matches.length === 1) inputEl.value = matches[0];
    else if (matches.length > 1) printLine(`Suggestions: ${matches.join(', ')}`);
  }

  function executeCommand(input) {
    printLine(`dev@portfolio:~$ ${input}`, 'prompt');

    const parts = input.toLowerCase().split(/\s+/);
    const cmd = parts[0];

    const navMap = {
      portfolio: '#portfolio',
      home: '#home',
      about: '#about',
      resume: '#resume',
      contact: '#contact',
    };

    if (navMap[cmd]) {
      printLine(`Navigating to ${cmd}...`, 'success');
      close();
      document.querySelector(navMap[cmd])?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const command = COMMANDS[cmd];
    if (!command) {
      printLine(`Command not found: ${cmd}. Type "help" for available commands.`, 'error');
      return;
    }

    if (cmd === 'clear') {
      clearOutput();
      return;
    }

    const result = command.execute();
    if (result) {
      result.split('\n').forEach((line) => { if (line.trim()) printLine(line); });
    }
  }

  function printLine(text, type = '') {
    const line = document.createElement('div');
    line.className = `line${type ? ` line--${type}` : ''}`;
    line.textContent = text;
    outputEl.appendChild(line);
    outputEl.scrollTop = outputEl.scrollHeight;
  }

  function clearOutput() {
    outputEl.innerHTML = '';
  }

  return { init, open, close, toggle, executeCommand, printLine };
})();

if (typeof window !== 'undefined') {
  window.DevTerminal = DevTerminal;
}

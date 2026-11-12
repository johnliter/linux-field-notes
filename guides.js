/* Add future guides by duplicating an object in this array. All text is escaped by app.js. */
window.FIELD_GUIDES = [
  {
    id: 'omarchy-shell-stuck-after-suspend',
    number: '001',
    title: 'Omarchy menus stop responding after sleep',
    summary: 'Quickshell stays running after suspend, but the Omarchy menu stops opening. Recover the stuck process without rebooting the desktop.',
    category: 'Desktop & shell',
    platform: 'Omarchy / Hyprland',
    date: '2026-11-12',
    status: 'Recovery confirmed',
    tags: ['omarchy', 'quickshell', 'hyprland', 'suspend', 'resume', 'menu', 'sleep', 'keyboard'],
    symptoms: [
      'The desktop wakes from sleep, but Omarchy menus do not respond.',
      'The terminal still works and Hyprland configuration reload succeeds.',
      'Running omarchy-menu toggle reports: omarchy-shell is not responding.'
    ],
    steps: [
      {title: 'Check the shell process', explanation: 'Confirm the Quickshell process still exists. A running PID alone does not mean it is responding.', command: 'pgrep -af quickshell'},
      {title: 'Try the shell health check', explanation: 'This command was unresponsive during the documented incident.', command: 'omarchy-shell shell ping'},
      {title: 'Recover the stalled process', explanation: 'Reusable targeted command. The specific PID-based equivalent was confirmed to restore menus; this generalized version should be verified on your machine. The bar may briefly disappear and return.', command: "pkill -TERM -f '^quickshell -n -p /usr/share/omarchy/shell$'"},
      {title: 'Verify menu behavior', explanation: 'Test the Omarchy menu again. If it is still broken, inspect shell logs before taking further action.', command: 'omarchy-menu toggle'}
    ],
    evidence: [
      'hyprctl reload completed successfully; hyprctl configerrors printed no configuration errors.',
      'pgrep found PID 1596 running quickshell -n -p /usr/share/omarchy/shell.',
      'omarchy restart shell failed its readiness check. The journal reported: An instance of this configuration is already running.',
      'The terminal and systemd HYPRLAND_INSTANCE_SIGNATURE values matched.',
      'kill -TERM 1596 restored the menus during the observed session.'
    ],
    caveat: 'The direct kill -TERM 1596 was tested successfully. The reusable pkill form shown here has the same intended target but was not separately tested. Why Quickshell became unresponsive after sleep has not been established; prior NVIDIA resume errors are not proof of causation.',
    safety: 'This targets the Omarchy Quickshell process, not Hyprland or your other applications. It can briefly hide the taskbar and menus. Avoid using a broad pkill quickshell if you run other Quickshell instances.'
  }
];

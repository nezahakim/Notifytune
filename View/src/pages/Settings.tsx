import { useState } from 'react';

function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    language: 'English',
    fontSize: 'Medium',
    dataUsage: 'WiFi and Cellular',
  });

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [setting]: !prevSettings[setting]
    }));
  };

  const handleSelect = (setting: keyof typeof settings, value: string) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [setting]: value
    }));
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900">
      <header className="flex items-center p-4 bg-blue-500 text-white">
        <button className="p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-white" aria-label="Back">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h1 className="ml-4 text-xl font-semibold">Settings</h1>
      </header>

      <div className="flex-grow p-4 space-y-6">
        <section>
          <h2 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-3">General</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <SettingToggle
              label="Notifications"
              checked={settings.notifications}
              onChange={() => handleToggle('notifications')}
            />
            <SettingToggle
              label="Dark Mode"
              checked={settings.darkMode}
              onChange={() => handleToggle('darkMode')}
            />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-3">Appearance</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <SettingSelect
              label="Language"
              value={settings.language}
              onChange={(value:any) => handleSelect('language', value)}
              options={['English', 'Spanish', 'French', 'German']}
            />
            <SettingSelect
              label="Font Size"
              value={settings.fontSize}
              onChange={(value:any) => handleSelect('fontSize', value)}
              options={['Small', 'Medium', 'Large']}
            />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-3">Data and Storage</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <SettingSelect
              label="Data Usage"
              value={settings.dataUsage}
              onChange={(value:any) => handleSelect('dataUsage', value)}
              options={['WiFi Only', 'WiFi and Cellular']}
            />
          </div>
        </section>

        <section>
          <h2 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-3">About</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <span className="text-gray-700 dark:text-gray-300">Version</span>
              <span className="text-gray-500 dark:text-gray-400">1.0.0</span>
            </div>
            <button className="w-full text-left p-4 text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
              Terms of Service
            </button>
            <button className="w-full text-left p-4 text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
              Privacy Policy
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

const SettingToggle = ({ label, checked, onChange }:any) => (
  <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
    <span className="text-gray-700 dark:text-gray-300">{label}</span>
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
  </div>
);

const SettingSelect = ({ label, value, onChange, options }:any) => (
  <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
    <span className="text-gray-700 dark:text-gray-300">{label}</span>
    <select
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map((option: any) => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
);

export default Settings;
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  Bell,
  Shield,
  Key,
  Download,
  CreditCard,
  HelpCircle,
  AlertTriangle,
  Save,
  User,
} from "lucide-react";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("account");

  // State for each settings section
  const [account, setAccount] = useState({
    email: "sarah.johnson@example.com",
    phone: "+91 98765 43210",
    website: "https://sarahjohnson.dev",
  });
  const [notifications, setNotifications] = useState({
    emailMessages: true,
    pushSkillMatches: true,
    weeklyReports: false,
    sessionReminders: true,
    marketingEmails: false,
    communityUpdates: true,
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: "members",
    showOnlineStatus: true,
    allowDirectMessages: true,
    showLocation: false,
  });

  const handleAccountChange = (e) => {
    setAccount((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNotificationChange = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePrivacyChange = (key, value) => {
    setPrivacy((prev) => ({ ...prev, [key]: value }));
  };

  const settingsTabs = [
    { id: "account", label: "Account", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "privacy", label: "Privacy", icon: Shield },
    { id: "security", label: "Security", icon: Key },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "support", label: "Support", icon: HelpCircle },
  ];
  
  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-8"
        >
          Settings
        </motion.h1>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* --- Navigation --- */}
          <motion.nav 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 mb-8 lg:mb-0"
          >
            <ul className="space-y-2">
              {settingsTabs.map((tab) => (
                <li key={tab.id}>
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                      activeTab === tab.id
                        ? "bg-slate-700/50 text-purple-400 font-semibold"
                        : "text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* --- Content Area --- */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.2 }}
              >
                {/* Account Settings */}
                {activeTab === "account" && (
                  <SettingsSection title="Account Settings" icon={User}>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField label="Email Address" name="email" type="email" value={account.email} onChange={handleAccountChange}/>
                        <InputField label="Phone Number" name="phone" type="tel" value={account.phone} onChange={handleAccountChange}/>
                      </div>
                      <InputField label="Website URL" name="website" type="url" value={account.website} onChange={handleAccountChange}/>
                    </div>
                    <SettingsFooter onSave={() => console.log('Saving account', account)} />
                  </SettingsSection>
                )}

                {/* Notification Settings */}
                {activeTab === "notifications" && (
                  <SettingsSection title="Notification Preferences" icon={Bell}>
                    <div className="divide-y divide-slate-700">
                      <Toggle
                        label="Email for new messages"
                        enabled={notifications.emailMessages}
                        onChange={() => handleNotificationChange("emailMessages")}
                      />
                      <Toggle
                        label="Push notifications for skill matches"
                        enabled={notifications.pushSkillMatches}
                        onChange={() => handleNotificationChange("pushSkillMatches")}
                      />
                       <Toggle
                        label="Session reminders"
                        enabled={notifications.sessionReminders}
                        onChange={() => handleNotificationChange("sessionReminders")}
                      />
                      <Toggle
                        label="Weekly progress reports"
                        enabled={notifications.weeklyReports}
                        onChange={() => handleNotificationChange("weeklyReports")}
                      />
                      <Toggle
                        label="Community updates & announcements"
                        enabled={notifications.communityUpdates}
                        onChange={() => handleNotificationChange("communityUpdates")}
                      />
                       <Toggle
                        label="Marketing and promotional emails"
                        enabled={notifications.marketingEmails}
                        onChange={() => handleNotificationChange("marketingEmails")}
                      />
                    </div>
                  </SettingsSection>
                )}
                
                {/* Privacy Settings */}
                {activeTab === "privacy" && (
                  <SettingsSection title="Privacy & Security" icon={Shield}>
                     <div className="space-y-4">
                        <div>
                          <label className="block mb-2 text-sm font-medium text-slate-300">Profile Visibility</label>
                          <select value={privacy.profileVisibility} onChange={(e) => handlePrivacyChange("profileVisibility", e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all">
                             <option value="public">Public - Anyone can view my profile</option>
                             <option value="members">Members Only - Only registered users</option>
                             <option value="private">Private - Only people I connect with</option>
                          </select>
                        </div>
                        <div className="divide-y divide-slate-700">
                          <Toggle label="Show my online status" enabled={privacy.showOnlineStatus} onChange={() => handlePrivacyChange("showOnlineStatus", !privacy.showOnlineStatus)} />
                          <Toggle label="Allow direct messages from anyone" enabled={privacy.allowDirectMessages} onChange={() => handlePrivacyChange("allowDirectMessages", !privacy.allowDirectMessages)} />
                          <Toggle label="Show my location to other users" enabled={privacy.showLocation} onChange={() => handlePrivacyChange("showLocation", !privacy.showLocation)} />
                        </div>
                     </div>
                  </SettingsSection>
                )}
                
                {/* Security Settings */}
                {activeTab === 'security' && (
                  <SettingsSection title="Security" icon={Key}>
                     <div className="space-y-3">
                        <button className="w-full text-left bg-slate-700/50 hover:bg-slate-700 font-medium text-slate-100 py-3 px-4 rounded-lg transition-colors">Change Password</button>
                        <button className="w-full text-left bg-slate-700/50 hover:bg-slate-700 font-medium text-slate-100 py-3 px-4 rounded-lg transition-colors">Enable Two-Factor Authentication</button>
                        <button className="w-full text-left bg-slate-700/50 hover:bg-slate-700 font-medium text-slate-100 py-3 px-4 rounded-lg transition-colors flex items-center justify-between">
                            <span>Download My Data</span> <Download className="h-5 w-5 text-slate-400" />
                        </button>
                     </div>
                      <div className="mt-8">
                        <h4 className="text-lg font-bold text-red-400 mb-4 flex items-center"><AlertTriangle className="h-5 w-5 mr-2" />Danger Zone</h4>
                        <div className="border border-red-500/30 bg-red-500/10 rounded-lg p-4 space-y-3">
                           <button className="w-full bg-red-600/80 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center space-x-2">
                             <AlertTriangle className="h-4 w-4" /> <span>Delete Account Permanently</span>
                           </button>
                           <p className="text-sm text-red-400/80">⚠️ This action is permanent and cannot be undone. All your data will be lost.</p>
                        </div>
                      </div>
                  </SettingsSection>
                )}
                
                {/* Billing */}
                {activeTab === 'billing' && (
                    <SettingsSection title="Billing & Subscription" icon={CreditCard}>
                        <div className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 p-6 rounded-lg border border-purple-500/30">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h4 className="font-bold text-xl text-white">SkillSwap+ Pro</h4>
                                    <p className="text-slate-300">Your subscription is active.</p>
                                </div>
                                <span className="text-sm font-medium bg-green-500/20 text-green-300 px-3 py-1 rounded-full">Active</span>
                            </div>
                             <button className="w-full mt-4 bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium py-2 px-4 rounded-lg transition-colors">Manage Subscription</button>
                        </div>
                    </SettingsSection>
                )}
                
                 {/* Support */}
                {activeTab === 'support' && (
                    <SettingsSection title="Help & Support" icon={HelpCircle}>
                        <div className="space-y-2">
                            <a href="#" className="block py-3 px-4 rounded-lg hover:bg-slate-700/50 transition-colors">Help Center & FAQ</a>
                            <a href="#" className="block py-3 px-4 rounded-lg hover:bg-slate-700/50 transition-colors">Contact Support</a>
                            <a href="#" className="block py-3 px-4 rounded-lg hover:bg-slate-700/50 transition-colors">Report a Problem</a>
                        </div>
                    </SettingsSection>
                )}

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components for clean structure
const SettingsSection = ({ title, icon: Icon, children }) => (
  <div className="bg-slate-800 border border-slate-700 rounded-xl">
    <div className="p-6 border-b border-slate-700">
      <h3 className="text-2xl font-bold text-slate-100 flex items-center">
        <Icon className="h-6 w-6 mr-3 text-purple-400" />
        {title}
      </h3>
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const InputField = ({ label, ...props }) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-slate-300">{label}</label>
    <input {...props} className="w-full bg-slate-700 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"/>
  </div>
);

const Toggle = ({ label, enabled, onChange }) => (
  <label className="flex items-center justify-between py-4 cursor-pointer">
    <span className="text-sm text-slate-300">{label}</span>
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
        enabled ? "bg-purple-600" : "bg-slate-600"
      }`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}/>
    </button>
  </label>
);

const SettingsFooter = ({ onSave, onCancel }) => (
    <div className="flex justify-end space-x-4 pt-6 mt-6 border-t border-slate-700">
      <button onClick={onCancel} className="bg-slate-700 hover:bg-slate-600 text-slate-200 font-medium py-2 px-4 rounded-lg transition-colors duration-300">
        Reset
      </button>
      <button onClick={onSave} className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center space-x-2">
        <Save className="h-4 w-4" />
        <span>Save Changes</span>
      </button>
    </div>
)

export default SettingsPage;

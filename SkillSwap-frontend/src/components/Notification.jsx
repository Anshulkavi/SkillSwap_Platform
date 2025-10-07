import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Bell, Award, Heart, UserPlus, MessageCircle, Trophy 
} from 'lucide-react';

export const notificationsData = [
    {
        id: 1,
        type: 'badge',
        icon: Award,
        title: 'New Badge Earned!',
        message: 'You earned the "Quick Learner" badge',
        time: '5 min ago',
        read: false,
        color: 'text-yellow-400'
    },
    {
        id: 2,
        type: 'like',
        icon: Heart,
        title: 'Video Liked',
        message: 'John Doe liked your "React Hooks Tutorial"',
        time: '1 hour ago',
        read: false,
        color: 'text-red-400'
    },
    {
        id: 3,
        type: 'follower',
        icon: UserPlus,
        title: 'New Follower',
        message: 'Sarah Connor started following you',
        time: '3 hours ago',
        read: true,
        color: 'text-blue-400'
    },
    {
        id: 4,
        type: 'comment',
        icon: MessageCircle,
        title: 'New Comment',
        message: 'Alex commented on your video',
        time: '5 hours ago',
        read: true,
        color: 'text-green-400'
    },
    {
        id: 5,
        type: 'achievement',
        icon: Trophy,
        title: 'Milestone Reached',
        message: 'You reached 1000 views on your channel!',
        time: '1 day ago',
        read: true,
        color: 'text-purple-400'
    }
];

const Notification = ({ isOpen, notifications = notificationsData, onClose }) => {
    const unreadCount = notifications.filter(n => !n.read).length;

    const notificationVariants = {
        hidden: { opacity: 0, scale: 0.95, y: -10 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.2, ease: 'easeOut' } },
        exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.15, ease: 'easeIn' } }
    };

    const handleMarkAllAsRead = () => {
        console.log('Mark all as read clicked');
    };

    const handleViewAll = () => {
        console.log('View all notifications clicked');
        onClose();
    };

    const handleNotificationClick = (notification) => {
        console.log('Notification clicked:', notification);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    variants={notificationVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="absolute right-0 mt-2 w-96 bg-slate-800/95 backdrop-blur-lg rounded-lg shadow-xl border border-slate-700 z-50 overflow-hidden"
                >
                    {/* Header */}
                    <div className="px-4 py-3 border-b border-slate-700 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-white">Notifications</h3>
                        {unreadCount > 0 && (
                            <button 
                                onClick={handleMarkAllAsRead}
                                className="text-xs text-purple-400 hover:text-purple-300 font-medium transition-colors"
                            >
                                Mark all as read
                            </button>
                        )}
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length > 0 ? (
                            notifications.map((notification, index) => {
                                const IconComponent = notification.icon;
                                return (
                                    <motion.div
                                        key={notification.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => handleNotificationClick(notification)}
                                        className={`px-4 py-3 border-b border-slate-700/50 hover:bg-slate-700/50 transition-colors cursor-pointer ${
                                            !notification.read ? 'bg-slate-700/30' : ''
                                        }`}
                                    >
                                        <div className="flex items-start space-x-3">
                                            <div className={`p-2 rounded-full bg-slate-700 ${notification.color}`}>
                                                <IconComponent className="h-4 w-4" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-white truncate">
                                                    {notification.title}
                                                </p>
                                                <p className="text-xs text-slate-400 mt-0.5">
                                                    {notification.message}
                                                </p>
                                                <p className="text-xs text-slate-500 mt-1">
                                                    {notification.time}
                                                </p>
                                            </div>
                                            {!notification.read && (
                                                <div className="h-2 w-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })
                        ) : (
                            <div className="px-4 py-8 text-center">
                                <Bell className="h-12 w-12 text-slate-600 mx-auto mb-3" />
                                <p className="text-sm text-slate-400">No notifications yet</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <div className="px-4 py-3 border-t border-slate-700 bg-slate-800/50">
                            <button 
                                onClick={handleViewAll}
                                className="text-xs text-purple-400 hover:text-purple-300 font-medium w-full text-center transition-colors"
                            >
                                View all notifications
                            </button>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Notification;
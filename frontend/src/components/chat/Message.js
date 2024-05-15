import { formatDistanceToNow } from 'date-fns';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Message({ message, self }) {
  const renderMessage = () => {
    // Check if message is self or from others to determine message style
    const messageStyle = self !== message.sender
      ? 'text-gray-700 dark:text-gray-400 bg-white border border-gray-200 shadow-md dark:bg-gray-900 dark:border-gray-700'
      : 'bg-blue-600 dark:bg-blue-500 text-white';

    // Format the message creation date
    const formattedDate = formatDistanceToNow(new Date(message.createdAt), { addSuffix: true });

    return (
      <li className={classNames(self !== message.sender ? 'justify-start' : 'justify-end', 'flex')}>
        <div>
          <div className={classNames('relative max-w-xl px-3 py-2 rounded-lg shadow', messageStyle)}>
            <span className="block font-normal">{message.message}</span>
          </div>
          <span className="block text-sm text-gray-700 dark:text-gray-400">{formattedDate}</span>
        </div>
      </li>
    );
  };

  return renderMessage();
}

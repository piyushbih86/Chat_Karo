import { useChatStore } from "../../store/useChatStore";
import defaultAvatar from "../assets/avatar.png";

const ChatHeader = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="border-b border-base-300 p-4">
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="size-10 rounded-full">
            <img
              src={selectedUser.profilePic || defaultAvatar}
              alt={selectedUser.fullName}
              onError={(e) => { e.currentTarget.src = defaultAvatar; }}
            />
          </div>
        </div>
        <div>
          <h3 className="font-semibold">{selectedUser.fullName}</h3>
          <p className="text-sm text-base-content/60">Active now</p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
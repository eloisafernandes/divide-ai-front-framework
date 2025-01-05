import { formatInitialName } from "@/utils/Formatter";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { IUserResponse } from "@/interfaces/IUser";

interface GroupAvatarsProps {
    users: IUserResponse[];
    limit?: number;
};

export const generateColor = (id: number) => {
    const colors = [
        "bg-red-500 text-white",
        "bg-blue-500 text-white",
        "bg-green-500 text-white",
        "bg-yellow-500 text-white",
        "bg-purple-500 text-white",
        "bg-pink-500 text-white",
        "bg-teal-500 text-white",
        "bg-orange-500 text-white",
        "bg-indigo-500 text-white",
    ];
    return colors[id % colors.length];
};

export function GroupAvatars({ users, limit = 3 }: GroupAvatarsProps) {
    const displayedUsers = users.slice(0, limit);
    const remainingCount = users.length - limit;

    return (
        <div className="flex -space-x-2.5 *:ring *:ring-background">
            {displayedUsers.map((user) => (
                <Avatar key={user.id}>
                    <AvatarFallback className={generateColor(user.id)}>
                    {formatInitialName(user.firstName.charAt(0))}
                    {formatInitialName(user.lastName.charAt(0))}
                    </AvatarFallback>
                </Avatar>
            ))}
            {remainingCount > 0 && (
                <Avatar>
                    <AvatarFallback className={generateColor(remainingCount)}>
                        +{remainingCount}
                    </AvatarFallback>
                </Avatar>
            )}
        </div>
    );
}
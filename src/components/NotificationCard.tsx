import { Notification, getPriorityLabel } from '../types/taskos';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Bell, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface NotificationCardProps {
  notification: Notification;
  onMarkRead?: (id: number) => void;
}

const priorityColors: Record<number, string> = {
  1: 'text-destructive',
  2: 'text-yellow-500',
  3: 'text-muted-foreground',
};

const priorityIcons: Record<number, typeof AlertTriangle> = {
  1: AlertTriangle,
  2: Clock,
  3: Bell,
};

export default function NotificationCard({ notification, onMarkRead }: NotificationCardProps) {
  const PriorityIcon = priorityIcons[notification.priority];
  
  return (
    <Card 
      className={`transition-colors cursor-pointer border-border ${
        notification.is_read ? 'bg-card' : 'bg-muted/30 border-l-2 border-l-primary'
      }`}
      onClick={() => onMarkRead?.(notification.id)}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={`mt-0.5 ${priorityColors[notification.priority]}`}>
            <PriorityIcon size={20} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className={`font-medium text-foreground ${!notification.is_read ? 'font-semibold' : ''}`}>
                {notification.topic}
              </h4>
              {notification.is_approval_notification && (
                <Badge variant="outline" className="text-xs bg-orange-500/20 text-orange-500 border-orange-500/30">
                  Approval
                </Badge>
              )}
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
              {notification.description}
            </p>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                From: <span className="text-foreground">{notification.from_name || 'System'}</span>
              </span>
              <span>{formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}</span>
            </div>
          </div>
          
          {notification.is_read && (
            <CheckCircle size={16} className="text-green-500 mt-0.5" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}

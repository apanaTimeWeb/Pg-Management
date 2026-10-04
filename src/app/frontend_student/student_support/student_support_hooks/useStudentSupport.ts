import { useState, useEffect } from 'react';
import { useStudentContext } from '@/app/frontend_student/student_components/StudentContext';
import { studentOperationsApi } from '@/app/frontend_student/student_lib/student_api/StudentOperations';

export interface TicketMessage {
  sender: 'student' | 'manager';
  text: string;
  time: string;
}

export interface SupportTicket {
  id: string;
  category: string;
  status: 'Open' | 'Resolved' | 'Closed';
  date: string;
  description: string;
  messages: TicketMessage[];
}

export function useStudentSupport() {
  const { profile, loading: contextLoading } = useStudentContext();
  const [ticketsData, setTicketsData] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = () => {
    if (profile) {
      const studentId = profile.userId || profile.id;
      const apiTickets = studentOperationsApi.getSupportTickets(studentId);
      
      const formatted: SupportTicket[] = apiTickets.map(t => ({
        id: t.id,
        category: t.category,
        status: t.status as 'Open' | 'Resolved' | 'Closed',
        date: t.date,
        description: t.description,
        messages: [
          { sender: 'student', text: t.description, time: '10:00 AM' }
        ]
      }));

      // Add dummy data for a richer UI with conversation
      formatted.push(
        {
          id: 'TKT-1024', category: 'Payment Issue', status: 'Resolved', date: '2026-09-28',
          description: 'Rent receipt for September is not generating in the app.',
          messages: [
            { sender: 'student', text: 'Rent receipt for September is not generating in the app.', time: '10:00 AM' },
            { sender: 'manager', text: 'We had a sync issue. It is resolved now. You can download the receipt.', time: '11:30 AM' }
          ]
        },
        {
          id: 'TKT-1029', category: 'Room Issue', status: 'Open', date: '2026-10-02',
          description: 'I want to change my room from 102 to 105.',
          messages: [
            { sender: 'student', text: 'I want to change my room from 102 to 105 as discussed.', time: '02:00 PM' }
          ]
        }
      );

      setTicketsData(formatted);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [profile]);

  const addMessage = (ticketId: string, messageText: string) => {
    setTicketsData(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          messages: [...t.messages, { sender: 'student', text: messageText, time: 'Just now' }]
        };
      }
      return t;
    }));
  };

  const reopenTicket = (ticketId: string) => {
    setTicketsData(prev => prev.map(t => t.id === ticketId ? { ...t, status: 'Open' } : t));
  };

  return {
    profile,
    loading: contextLoading || loading,
    ticketsData,
    addMessage,
    reopenTicket
  };
}

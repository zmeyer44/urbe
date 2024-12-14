'use client';
import { useModal } from '@repo/design-system/components/modal';
// import type { GetEventReturnType } from "@/actions/events";
// import { createRsvp } from "@/actions/rsvps";
import { ConfirmModal } from '@repo/design-system/components/modal/modals/confirm-modal';
import { Button } from '@repo/design-system/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/design-system/components/ui/card';
import { toast } from '@repo/design-system/components/ui/use-toast';
import { AlertCircleIcon, CheckCircleIcon } from 'lucide-react';
import { useState } from 'react';
// import { api } from "@/lib/trpc/api";

type RegistrationSectionProps = {
  event: {
    approvalRequired: boolean;
    maxCapacity: number;
    rsvps: {
      id: string;
    }[];
    ticketRequired: boolean;
    registrationOpen: boolean;
    startDateTime: Date;
  };
  isRegistered?: boolean;
  className?: string;
};
export function RegistrationSection({
  event,
  isRegistered,
}: RegistrationSectionProps) {
  const modal = useModal();
  const [loading, setLoading] = useState(false);
  // const { data: invite } = api.event.getEventInvite.useQuery({
  //   eventId: event.id,
  // });
  let state:
    | 'approvalRequired'
    | 'waitlist'
    | 'ticketRequired'
    | 'closed'
    | string = '';
  if (event.approvalRequired) {
    state = 'approvalRequired';
  } else if (event.maxCapacity && event.rsvps.length >= event.maxCapacity) {
    state = 'waitlist';
  } else if (event.ticketRequired) {
    state = 'ticketRequired';
  } else if (!event.registrationOpen || event.startDateTime < new Date()) {
    state = 'closed';
  } else if (event.rsvps.length > 0) {
    state = 'invited';
  }

  if (isRegistered) {
    return (
      <div className="rounded-lg bg-muted p-4">
        <div className="flex items-center gap-2 text-primary">
          <CheckCircleIcon className="size-5" />
          <h2 className="font-semibold">Registered</h2>
        </div>
        <div className="mt-2">
          <p className="text-muted-foreground text-sm">
            You have been registered for the event.
          </p>
        </div>
      </div>
    );
  }
  if (event.rsvps.length > 0) {
    return (
      <Card className="mx-auto w-full">
        <CardHeader className="p-4 pb-3">
          <CardTitle className="font-semibold">Invited</CardTitle>
          <CardDescription>You have been invited to the event.</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="">
            <p className="text-foreground text-sm">
              Please click on the button below to confirm your attendance for
              our upcoming event.
            </p>
          </div>
          <div className="mt-4 text-center text-sm">
            {/* <RegistrationButton /> */}
            {/* <Button
              loading={loading}
              onClick={() =>
                modal?.show(
                  <ConfirmModal
                    title="Confirm attendance"
                    description="Are you sure you want to confirm your attendance for this event?"
                    onConfirm={handleRegister}
                  />,
                )
              }
              className="w-full"
            >
              Register
            </Button> */}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (state === 'closed') {
    return (
      <div className="rounded-lg bg-muted p-4">
        <div className="flex items-center gap-2">
          <AlertCircleIcon className="size-5" />
          <h2 className="font-semibold">Registration Closed</h2>
        </div>
        <div className="mt-2">
          <p className="text-muted-foreground text-sm">
            This event is not currently accepting new registrations. Please
            contact the host if needed.
          </p>
        </div>
      </div>
    );
  }
  if (state === 'waitlist') {
    return (
      <Card className="mx-auto w-full">
        <CardHeader className="p-4 pb-3">
          <CardTitle>Event Full</CardTitle>
          <CardDescription>
            We are at capacity, please join the waitlist
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="">
            <p className="text-foreground text-sm">
              Please click on the button below to join the waitlist. You will be
              notified if additional spots become available.
            </p>
          </div>
          <div className="mt-4 text-center text-sm">
            {/* <Button loading={loading} className="w-full font-semibold">
              Join Waitlist
            </Button> */}
          </div>
        </CardContent>
      </Card>
    );
  }
  async function handleRegister() {
    setLoading(true);
    try {
      modal?.hide();
      // await createRsvp(event.id);
      toast({
        title: 'Success',
        description: 'You have been registered for the event',
      });
    } catch (error: unknown) {
      console.error(error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader className="p-4 pb-3">
        <CardTitle className="font-semibold">Register now</CardTitle>
        <CardDescription>Join us and register today!</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="">
          <p className="text-foreground text-sm">
            Please click on the button below to register for our upcoming event.
          </p>
        </div>
        <div className="mt-4 text-center text-sm">
          {/* <RegistrationButton /> */}
          <Button
            // loading={loading}
            onClick={() =>
              modal?.show(
                <ConfirmModal
                  title="Register for event"
                  description="Are you sure you want to register for this event?"
                  onConfirm={handleRegister}
                />
              )
            }
            className="w-full"
          >
            Register
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

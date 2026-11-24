import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../ui";

export const ProfileMenu = () => {
  const isImage = false;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-3">
          <div className="user-image bg-primary overflow-hidden size-10 rounded-full flex items-center justify-center">
            {isImage ? (
              <img
                src="/"
                alt=""
                width={32}
                height={32}
                loading="lazy"
                className=""
              />
            ) : (
              <span className="text-[14px] font-semibold text-primary-foreground">
                كم
              </span>
            )}
          </div>

          <div className="hidden flex-col items-start gap-1 sm:flex">
            <p className="whitespace-nowrap text-xs font-semibold leading-5 text-text-primary sm:text-sm">
              إبراهيم المهدي
            </p>
            <p className="whitespace-nowrap text-[10px] leading-5 text-text-muted sm:text-xs">
              المسؤول الأعلى
            </p>
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <Button
          unstyled
          type="button"
          className="w-full rounded-md px-3 py-2 text-left text-sm font-medium text-logout transition-colors hover:bg-logout-hover"
        >
          Log out
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

import { useRouter } from "@/routes/hooks/use-router";
import { ChevronRight } from "lucide-react";

interface Props {
  title: string;
  items: { label: string; href: string }[];
}

const Breadcrumb = ({ items, title }: Props) => {
  const router = useRouter();
  return (
    <div>
      <span className="text-[32px] leading-[40px] text-main-light-color dark:text-white ">
        {title}
      </span>
      <nav className="text-sm text-gray-500  flex items-center space-x-1">
        {items.map((item, index) => (
          <span key={index} className="flex items-center">
            <a
              onClick={() => {
                router.push(item.href);
              }}
              className={`hover:text-main-light-color transition hover:cursor-pointer ${
                index === items.length - 1
                  ? "text-gray-800 dark:text-[#B7B7B7]"
                  : ""
              }`}
            >
              {item.label}
            </a>
            {index < items.length - 1 && (
              <ChevronRight className="w-4 h-4 mx-1" />
            )}
          </span>
        ))}
      </nav>
    </div>
  );
};

export default Breadcrumb;

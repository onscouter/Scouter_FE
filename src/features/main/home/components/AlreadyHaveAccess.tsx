import AnimatedButton from "@/components/AnimatedButton";

interface AlreadyHaveAccessProps {
  onClick: () => void;
}

const AlreadyHaveAccess: React.FC<AlreadyHaveAccessProps> = ({ onClick }) => (
  <AnimatedButton label={"Already have access? Login"} onClick={onClick} />
);

export default AlreadyHaveAccess;

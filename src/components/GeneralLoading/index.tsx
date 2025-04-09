import { GeneralLoadingContainer } from "./styles";

type GeneralLoadingProps = {
  size?: number;
  color?: string;
};

function GeneralLoading({ size, color }: GeneralLoadingProps) {
  return (
    <GeneralLoadingContainer size={size ?? 20} color={color}>
      <span />
    </GeneralLoadingContainer>
  );
}

export default GeneralLoading;

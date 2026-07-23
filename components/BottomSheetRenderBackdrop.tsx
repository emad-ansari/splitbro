import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

export const  RenderBackdrop = (props: any) => (
	<BottomSheetBackdrop
		{...props}
		appearsOnIndex={0}
		disappearsOnIndex={-1}
		opacity={0.4}
	/>
);

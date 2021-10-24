export type DragAndDropState = {
    dragging: boolean;
    file: File | null;
}

export type DragAndDropProps = {editParaList: (data: DragAndDropState) => void}//(data: DragAndDropState) => void
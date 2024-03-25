
export type MenuItemProps = {
    name: string;
    price: number;
};

export default function MenuItem(props: MenuItemProps) {
    return (
        <div className="flex">
            <div className="flex-grow">
                {props.name}
            </div>
            <div>
                {props.price}
            </div>
        </div>
    )
}
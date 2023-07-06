export default function Divider(props: {
    direction?: 'vertical' | 'horizontal'
}) {
    return props.direction === 'vertical' ? (
        <div className=" mx-auto my-12 w-[1.5px] h-24 bg-gradient-to-b from-primary to-black"></div>
    ) : (
        <hr className="my-8 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-primary to-transparent opacity-25 dark:opacity-100" />
    )
}

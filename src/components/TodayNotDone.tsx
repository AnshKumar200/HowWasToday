
type Props = {
    onDone: () => void;
}

const TodayNotDone = ({ onDone }: Props) => {
    return (
        <div className="flex flex-col absolute w-full h-full bg-amber-300 items-center justify-center">
            {/* TODO: animate opening */}
            <div>What's today been like for you?</div>
            <div>...Options...</div>

            <button onClick={onDone}>mark today / do it later</button>
        </div>
    )
}

export default TodayNotDone;

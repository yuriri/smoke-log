// Loading表示
type LoadingProps = {
  additionalClass: string
}

export default function Loading(props: LoadingProps) {
  return <p className={`text-gray-400 text-xl text-center ${props.additionalClass}`}>Loading...</p>
}
import WRPRojectLog from '../../../../components/MDX/WRProjectLog.mdx';
import NathanProjectLog from '../../../../components/MDX/NathanProjectLog.mdx';

export default function MilestoneOnePage() {
  return (
    <article className="prose flex min-w-full justify-start gap-x-6 p-10">
      <div className="top-0 w-1/2">
        <h2 className="text-center text-lg text-accent md:text-2xl">
          Wei Rong
        </h2>
        <WRPRojectLog />
      </div>
      <div className="min-h-full border"></div>
      <div className="top-0 w-1/2">
        <h2 className="text-center text-lg text-accent md:text-2xl">Nathan</h2>
        <NathanProjectLog />
      </div>
    </article>
  );
}

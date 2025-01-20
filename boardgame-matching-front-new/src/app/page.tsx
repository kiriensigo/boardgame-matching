import { Card, CardHeader, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <h1 className="text-3xl font-bold text-center">
            ボードゲーム仲間を見つけよう！
          </h1>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-lg text-gray-600">
              好きなボードゲームを通じて、新しい仲間と出会いましょう。
            </p>
            <p className="text-gray-600">
              プロフィールを設定して、マッチングを始めることができます。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
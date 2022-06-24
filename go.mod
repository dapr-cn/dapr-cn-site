module github.com/dapr-cn/dapr-cn-site

go 1.14

require (
	github.com/wowchemy/wowchemy-hugo-modules/wowchemy-cms/v5 v5.0.0-20220423180919-17d5d3f0ca43 // indirect
	github.com/wowchemy/wowchemy-hugo-modules/wowchemy/v5 v5.0.0-20220423180919-17d5d3f0ca43 // indirect
)

replace github.com/wowchemy/wowchemy-hugo-modules/wowchemy-cms/v5 => github.com/dapr-cn/wowchemy-hugo-themes/wowchemy-cms/v5 v5.0.0-20220623171526-5395db23ed1e

replace github.com/wowchemy/wowchemy-hugo-modules/wowchemy/v5 => github.com/dapr-cn/wowchemy-hugo-themes/wowchemy/v5 v5.0.0-20220623171526-5395db23ed1e

//replace github.com/wowchemy/wowchemy-hugo-modules/wowchemy-cms/v5 => ../wowchemy-hugo-themes/wowchemy-cms
//replace github.com/wowchemy/wowchemy-hugo-modules/wowchemy/v5 => ../wowchemy-hugo-themes/wowchemy
